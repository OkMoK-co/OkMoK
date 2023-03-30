#pragma once

#include <iostream>
#include <functional>

#include "../packet/Packet.hpp"
#include "../packet/RecvRingBuffer.hpp"
#include "Poco/Net/WebSocket.h"
#include "Poco/Net/HTTPServerParams.h"
#include "Poco/Net/HTTPServerSession.h"
#include "Poco/Net/HTTPServerResponseImpl.h"
#include "Poco/Net/HTTPServerRequestImpl.h"
#include <iostream>

/**
 * @brief 클라이언트의 세션을 관리하는 클래스입니다.
 */
class Session
{
public:
	/***
	 * @brief 클라이언트 연결 요청이 들어왔을 때 호출됩니다.
	 * @details 웹소켓을 생성합니다.
	 *          생성에 성공하면 클라이언트에게 응답(101)을 보냅니다.
	 *          세션의 기본 값들을 초기화합니다.
	 *          리액터(reactor)에다가 연결된 소켓과 이벤트를 등록합니다.
	 * @param socket 연결된 소켓
	 * @param reactor 이벤트 등록을 위한 리액터
	 */
	Session(Poco::Net::StreamSocket& socket, Poco::Net::SocketReactor& reactor) :
			_pParam(new Poco::Net::HTTPServerParams()),
			_httpSession(socket, _pParam),
			_response(_httpSession),
			_request(_response, _httpSession, _pParam),
			_socket(_request, _response),
			m_reactor(reactor)
	{
		mRecvBuffer.Create(1024*8);
		m_peerAddress = socket.peerAddress().toString();
		std::cout << "connection from " << m_peerAddress << " ..." << std::endl;

		m_reactor.addEventHandler(_socket,
		                          Poco::Observer<Session, Poco::Net::ReadableNotification>(*this, &Session::onReadable));
		_onConnection(this);
	}

	~Session()
	{
		std::cout << m_peerAddress << " disconnected ..." << std::endl;
	}


	static std::function<void(Session*)> _onConnection;
	static std::function<void(Session*)> _onClose;
	static std::function<void(const bool, const int, const short, const short, char*)> _addPacketFunc;


	void setIndex(const int index) { mIndex = index; }
	int getIndex() { return mIndex; }


	/***
	 * @brief 클라이언트 요청이 들어오면 가장 먼저 해당 함수가 호출됩니다.
	 * @param pNf reactor에서 전송해주는 알림 클래스입니다.
	 */
	void onReadable(Poco::Net::ReadableNotification* pNf)
	{
		pNf->release();
		try
		{
			auto pBuffer = mRecvBuffer.GetWriteBuffer(1024);

			int recvSize = _socket.receiveFrame(pBuffer, 1024, m_flags);

			std::cout << Poco::format("Frame received (length=%d, flags=0x%x).", recvSize, unsigned(m_flags)) << std::endl;

			if (recvSize == 0 || (m_flags & Poco::Net::WebSocket::FRAME_OP_BITMASK) == Poco::Net::WebSocket::FRAME_OP_CLOSE)
			{
				close();
			}
			else
			{
				auto [remainSize, pRemainData ] = mRecvBuffer.GetReceiveData(recvSize);
				std::cout << pBuffer << std::endl;
				auto deliveredSize = toPacketProcess(remainSize, pRemainData);
				mRecvBuffer.ForwardReadPos(deliveredSize);
			}
		}
		catch (Poco::Exception ex)
		{
			close();
		}
	}

	/**
	 * @brief 세션을 강제로 끊습니다.
	 * @param pNf reactor의 알림 클래스입니다.
	 */
	void onShutdown(Poco::Net::ShutdownNotification* pNf)
	{
		pNf->release();
		close();
	}

	/***
	 * @brief 패킷을 전송합니다.
	 * @param pData 패킷의 데이터입니다.
	 * @param size 패킷의 사이즈입니다.
	 */
	void sendPacket(const char* pData, const int size)
	{
		if (mIsConnected == false)
		{
			return;
		}
		_socket.sendFrame(pData, size, m_flags);
	}


private:
	/***
	 * @brief 패킷 데이터(RawData)의 유효성을 판단하고 패킷 큐에 추가합니다.
	 * @param remainByte 버퍼에 저장된 데이터의 크기
	 * @param pBuffer 버퍼에서 읽을 데이터의 시작 주소
	 * @return int 읽은 사이즈를 반환합나다.
	 */
	int toPacketProcess(int remainByte, char* pBuffer)
	{
		const int MAX_PACKET_SIZE = 1024;
		const int PACKET_HEADER_LENGTH = 5;
		const int PACKET_SIZE_LENGTH = 2;
		const int PACKET_TYPE_LENGTH = 2;

		int totalReadSize = 0;

		while (true)
		{
			if (remainByte < PACKET_HEADER_LENGTH)
			{
				break;
			}

			auto pHeader = (PACKET_HEADER*)pBuffer;

			if (pHeader->packetSize > MAX_PACKET_SIZE)
			{
				break;
			}

			if (remainByte < pHeader->packetSize)
			{
				break;
			}

			auto bodySize = pHeader->packetSize - PACKET_HEADER_LENGTH;
			auto packetID = pBuffer[PACKET_SIZE_LENGTH];
			std::cout << pHeader->packetID << std::endl;
			std::cout << bodySize << std::endl;
			std::cout << &pBuffer[PACKET_HEADER_LENGTH] << std::endl;
			_addPacketFunc(false, mIndex, pHeader->packetID, bodySize, &pBuffer[PACKET_HEADER_LENGTH]);

			remainByte -= pHeader->packetSize;
			totalReadSize += pHeader->packetSize;
			pBuffer += pHeader->packetSize;
		}

		return totalReadSize;
	}

	/**
	 * @brief 세션을 종료합니다.
	 */
	void close()
	{
		std::cout << "close " << m_peerAddress << " ..." << std::endl;

		mIsConnected = false;

		m_reactor.removeEventHandler(_socket,
		                             Poco::Observer<Session, Poco::Net::ReadableNotification>(*this, &Session::onReadable)
		);

		_socket.close();
		_onClose(this);
	}

	Poco::Net::HTTPServerParams::Ptr _pParam;
	Poco::Net::HTTPServerSession _httpSession;
	Poco::Net::HTTPServerResponseImpl _response;
	Poco::Net::HTTPServerRequestImpl _request;
	Poco::Net::WebSocket _socket;
	std::string m_peerAddress;
	Poco::Net::SocketReactor& m_reactor;

	int m_flags;
	int mIndex;
	bool mIsConnected = true;
	RecvRingBuffer mRecvBuffer;
};

inline std::function<void(Session*)> Session::_onConnection;
inline std::function<void(Session*)> Session::_onClose;
inline std::function<void(const bool, const int, const short, const short, char*)> Session::_addPacketFunc;
