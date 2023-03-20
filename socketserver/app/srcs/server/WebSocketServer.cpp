#include "WebSocketServer.hpp"

/**
* @brief 서버의 기본 값을 설정합니다.
* @param[in] maxSessionCount 서버가 최대 허용할 클라이언트의 수입니다.
*/
void	WebSocketServer::init(const int maxSessionCount)
{
	SetFunction();

	for (int i = 0; i < maxSessionCount; ++i)
	{
		_sessionIndexPool.push_back(i);
		_sessions.push_back(nullptr);
	}

	_packetManager.init(maxSessionCount);
}

/**
* @brief 서버를 시작합니다.
* @details 서버 소켓을 설정하고 클라이언트의 요청을 처리할 쓰레드를 생성합니다.
* @param[in] port 할당할 서버 포트
*/
void	WebSocketServer::start(const Poco::UInt16 port)
{
	/**
	* @brief 쓰레드를 실행합니다.
	* std::thread 생성자에 정의한 c++람다식이 실행됩니다.
	* 람다식의 [&]는 capture절 부분으로 자기 자신(MultiplexedServer 객체)을 람다 본문에 넘겨줍니다.
	*/
	std::thread logicThread([&]() {
		run(); }
	);

	/**
	* @brief Poco::Net::ServerSocket::bind()
	* 서버 소켓에 포트를 적용합니다.
	* @details port, reuseAddress를 인자로 받는다.
	* port는 적용할 포트번호입니다.
	* resueAddress는 SO_REUSEADDR 옵션을 사용 할지에 대한 여부이다.
	*/
	_serverSocket.bind(port, true);

	/**
	* @brief Poco::Net::ServerSocket::listen()
	* 서버의 소켓을 설정합니다.
	* @details 클라이언트의 요청을 받을 수 있는 수신 상태로 전환합니다.
	*/
	_serverSocket.listen();

	/**
	* @brief Poco::Net::ParallelSocketAcceptor
	* 클라이언트의 연결 요청을 처리합니다.
	* 클라이언트의 연결 요청시 연결을 허용(Accept)하고 Session객체를 생성해 줍니다.
	* Session 객체를 생성시 연결 허용 후 생성된 소켓(socket)과 리액터(reactor)를 넘겨줍니다.
	*/
	_pAcceptor = std::make_unique<Poco::Net::ParallelSocketAcceptor<Session, Poco::Net::SocketReactor>>(_serverSocket, _reactor);

	_reactor.run();
}

/**
* @brief 패킷 큐에 담긴 패킷들을 순차적으로 처리합니다.
*/
void	WebSocketServer::run()
{
	std::cout << "start Packet Thread >>>" << std::endl;

	_isRun = true;

	while (_isRun)
	{
		while (true)
		{
			/**
			* 패킷 큐에서 하나의 패킷을 가져옵니다.
			*/
			auto packetInfo = getPacketInfo();

			/**
			* 패킷 큐가 비어있을 경우, PacketID는 0이며 sleep() 상태로 전환합니다.
			*/
			if (packetInfo.PacketID == 0)
			{
				std::this_thread::sleep_for(std::chrono::milliseconds(1));
				break;
			}
			else
			{
				/**
				* 패킷 ID가 유효할 경우, 해당 패킷 요청을 처리합니다.
				*/
				if (packetInfo.PacketID > (short)PACKET_ID::INTERNAL_END)
				{
					_packetManager.process(packetInfo.SessionIndex,
					                       packetInfo.PacketID,
					                       packetInfo.pBodyData,
					                       packetInfo.PacketBodySize);
				}
				/**
				* 패킷 ID가 PACKET_ID::INTERNAL_CLOSE일 경우, 해당 세션을 해제합니다.
				*/
				if (packetInfo.PacketID == (short)PACKET_ID::INTERNAL_CLOSE)
				{
					unRegisterSesssion(packetInfo.SessionIndex);
				}
			}
		}
	}
}

/**
* @brief 서버의 기본 값(init) 설정시 필요한 함수 포인터를 등록합니다.
*/
void	WebSocketServer::SetFunction()
{
	auto onConnectFunc = [&](Session* sock)
	{
		this->onConnect(sock);
	};
	Session::_onConnection = onConnectFunc;

	auto onCloseFunc = [&](Session* pSession)
	{
		this->onClose(pSession);
	};
	Session::_onClose = onCloseFunc;

	auto addPacketFunc = [&](const bool bInternal,  const int sessionIndex, const short pktID, const short bodySize, char* pDataPos)
	{
		this->addPacketQueue(bInternal, sessionIndex, pktID, bodySize, pDataPos);
	};
	Session::_addPacketFunc = addPacketFunc;

	auto sendPacketFunc = [&](const int sessionIndex, const char* pData, const int dataSize)
	{
		this->sendPacket(sessionIndex, pData, dataSize);
	};
	_packetManager.sendPacketFunc = sendPacketFunc;
}

/**
* @brief 세션을 등록합니다.
* @param[in]
*/
void	WebSocketServer::onConnect(Session* pSession)
{
	registerSesssion(pSession);
}

/**
* @brief
* @param pSession
*/
void	WebSocketServer::onClose(Session* pSession)
{
	addPacketQueue(true, pSession->getIndex(), (short) PACKET_ID::INTERNAL_CLOSE, 0, nullptr);
}


/***
* @brief 패킷 큐에 저장된 패킷을 반환합니다.
* @return RecvPacketInfo
*/
void	WebSocketServer::addPacketQueue(const bool bInternal, const Poco::Int32 sessionIndex, const short pktID, const short bodySize, char* pDataPos)
{
	if (bInternal == false && pktID <= (short)PACKET_ID::INTERNAL_END)
	{
		return;
	}

	std::lock_guard<std::mutex> lock(_mutexPacketQueue);

	RecvPacketInfo packetInfo;
	packetInfo.SessionIndex = sessionIndex;
	packetInfo.PacketID = pktID;
	packetInfo.PacketBodySize = bodySize;
	packetInfo.pBodyData = pDataPos;

	_packetQueue.push_back(packetInfo);
}

/**
 * @brief 서버에서 처리할 내용을 패킷 큐에 추가합니다.
 * @param bInternal 서버 내부에서 요청한 건가?
 * @param sessionIndex 세션의 인덱스
 * @param pktID 추가할 패킷의 ID
 * @param bodySize 추가할 패킷의 사이즈
 * @param pDataPos 추가할 패킷의 데이터
 */
RecvPacketInfo WebSocketServer::getPacketInfo()
{
	std::lock_guard<std::mutex> lock(_mutexPacketQueue);

	RecvPacketInfo packetInfo;

	if (_packetQueue.empty() == false)
	{
		packetInfo = _packetQueue.front();
		_packetQueue.pop_front();
	}

	return packetInfo;
}

/***
 * @brief 세션을 초기화합니다.
 * @details 세션에 인덱스를 부여하고 배열에 추가합니다.
 * @param pSession 초기화할 세션
 */
void	WebSocketServer::registerSesssion(Session* pSession)
{
	auto newSessionIndex = allocSesionIndex();
	if (newSessionIndex)
	{
		pSession->setIndex(newSessionIndex.value());
		std::cout << "register : " << newSessionIndex.value() << std::endl;
		_sessions[newSessionIndex.value()] = pSession;
	}
}

/***
* @brief 세션을 해제합니다.
* @details 세션을 헤제하고 배열에서 삭제합니다. 그리고 세션 인덱스를 반환합니다.
* @param index 해제할 세션 인덱스
*/
void	WebSocketServer::unRegisterSesssion(const int index)
{
	delete _sessions[index];
	_sessions[index] = nullptr;
	freeSessionIndex(index);
}

/***
* @brief 패킷을 전송합니다.
* @param sessionIndex 세션 인덱스
* @param pData 전달할 패킷 데이터
* @param size 전달할 패킷 사이즈
*/
void	WebSocketServer::sendPacket(const int sessionIndex, const char* pData, const int size)
{
	_sessions[sessionIndex]->sendPacket(pData, size);
}

/***
* @brief 사용 가능한 세션 인덱스를 반환합니다.
* @return std::optional<int>
*/
std::optional<int> WebSocketServer::allocSesionIndex()
{
	std::lock_guard<std::mutex> lock(_mutexSessionPool);
	if (_sessionIndexPool.empty())
	{
		return std::nullopt;
	}

	auto index = _sessionIndexPool.front();
	_sessionIndexPool.pop_front();

	return index;
}

/***
* @brief 세션 인덱스를 반환합니다.
* @param index 반환할 세션 인덱스
*/
void	WebSocketServer::freeSessionIndex(const int index)
{
	std::lock_guard<std::mutex> lock(_mutexSessionPool);
	_sessionIndexPool.push_back(index);
}
