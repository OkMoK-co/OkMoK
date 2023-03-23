#include <utility>
#include <cstring>

#include <iostream>
#include "Packet.hpp"
#include "PacketManager.hpp"

/**
 * @brief 패킷 ID별 처리할 함수를 등록합니다.
 * @param[in] maxSessionCount 서버가 최대 허용할 클라이언트의 수 입니다.
 */
void PacketManager::init(const int maxSessionCount)
{
	_recvFuntionDictionary = std::unordered_map<int, PROCESS_RECV_PACKET_FUNCTION>();

	_recvFuntionDictionary[(int)PACKET_ID::DEV_ECHO] = &PacketManager::processDevEcho;
}

/**
 * @brief 패킷 요청을 처리할 함수를 호출합니다.
 * @details 전달 받은 패킷ID를 통해 m_RecvFuntionDictionary에 정의된 함수를 찾아 호출합니다.
 * @param connectionIndex 패킷을 요청한 SessionID입니다.
 * @param packetID 요청된 패킷의 ID입니다.
 * @param pBuf 요청된 패킷의 데이터입니다.
 * @param bodySize 요청된 패킷의 사이즈입나다.
 */
void PacketManager::process(int connectionIndex, const Poco::UInt16 packetID, char* pBuf, Poco::Int16 bodySize)
{
	auto iter = _recvFuntionDictionary.find(packetID);
	if (iter != _recvFuntionDictionary.end())
	{
		(this->*(iter->second))(connectionIndex, pBuf, bodySize);
	}
}

/**
 * @brief 에코 요청을 처리합니다.
 * @details 요청 받은 데이터를 클라이언트에게 그대로 전송합니다.
 * @param connIndex 요청한 클라이언트의 SessionID입니다.
 * @param pBodyData 요청된 패킷의 데이터입니다.
 * @param bodySize 요청된 패킷의 사이즈입니다.
 */
void PacketManager::processDevEcho(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize)
{
	auto packetID = (Poco::UInt16)PACKET_ID::DEV_ECHO;
	auto packetSize = (Poco::UInt16)(bodySize + sizeof(PACKET_HEADER));
	char echoData[1024] = { 0, };

	memcpy(&echoData, (char*)&packetSize, 2);
	memcpy(&echoData[2], (char*)&packetID, 2);
	memcpy(&echoData[5], pBodyData, bodySize);

	sendPacketFunc(connIndex, echoData, packetSize);
}
