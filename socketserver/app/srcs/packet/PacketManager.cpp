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
	_roomManager.init(maxSessionCount, 2);
	_userManager.init(maxSessionCount);

	_recvFuntionDictionary = std::unordered_map<int, PROCESS_RECV_PACKET_FUNCTION>();
	_recvFuntionDictionary[(int)PACKET_ID::DEV_ECHO] = &PacketManager::processDevEcho;
	_recvFuntionDictionary[(int)PACKET_ID::ROOM_CREATE_REQUEST] = &PacketManager::processCreateRoom;
	_recvFuntionDictionary[(int)PACKET_ID::ROOM_ENTER_REQUEST] = &PacketManager::processEnterRoom;
	_recvFuntionDictionary[(int)PACKET_ID::ROOM_INFO_REQUEST] = &PacketManager::processInfoRoom;
	_recvFuntionDictionary[(int)PACKET_ID::ROOM_MAIN_REQUEST] = &PacketManager::processEnterMain;
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

PACKET_HEADER PacketManager::makePacketHeader(Poco::UInt16 packetID)
{
	PACKET_HEADER packet;
	packet.packetID = packetID;
	packet.packetSize = 5;
	packet.type = 1;

	return packet;
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

/**
 * @brief 방 생성 요청을 처리합니다.
 * @details 방 생성 여부에 대한 결과를 클라이언트에게 전송합니다.
*/
void PacketManager::processCreateRoom(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize)
{
	PACKET_HEADER header = makePacketHeader((Poco::UInt16)PACKET_ID::ROOM_CREATE_RESPONSE);
	ROOM_CREATE_RESPONSE_PACKET& packet = static_cast<ROOM_CREATE_RESPONSE_PACKET&>(header);
	
	Poco::Int32 roomIndex = _roomManager.takeInactiveRoomIndex();
	if(roomIndex == -1)
	{
		packet.type = (Poco::UInt8)PACKET_OPTION::FAIL;	
		sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);
		return ;
	}

	User *user = _userManager.takeUserByConnIndex(connIndex);
	_roomManager.createRoom((Poco::UInt32)roomIndex, user);
	_userManager.deleteMainUsers(user);
	sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);
	
	PACKET_HEADER broadcastHeader = makePacketHeader((Poco::UInt16)PACKET_ID::ROOM_MAIN_RESPONSE);
	R_ROOM_LIST_RESPONSE_PACKET& broadcastPacket = static_cast<R_ROOM_LIST_RESPONSE_PACKET&>(broadcastHeader);
	
	sendMainRooms(&broadcastPacket);
	
	std::list<User *> mainUsers = _userManager.getMainUsers();
	for (User *user : mainUsers)
		sendPacketFunc(user->getIndex(), (char *)&broadcastPacket, broadcastPacket.packetSize);
}

void PacketManager::processEnterRoom(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize)
{
	
}

void PacketManager::processInfoRoom(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize)
{
	
}

void PacketManager::processEnterMain(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize)
{
	PACKET_HEADER header = makePacketHeader((Poco::UInt16)PACKET_ID::ROOM_MAIN_RESPONSE);
	ROOM_MAIN_RESPONSE_PACKET& packet = static_cast<ROOM_MAIN_RESPONSE_PACKET&>(header);
	
	sendMainRooms(&packet);
	
	User *user = _userManager.takeUserByConnIndex(connIndex);
	_userManager.addMainUsers(user);

	sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);
}

void PacketManager::sendMainRooms(ROOM_MAIN_RESPONSE_PACKET *packet) {
	std::map<Poco::UInt32, Room*> enterableRooms = _roomManager.getEnterableRooms();

	std::map<Poco::UInt32, Room*>::iterator it = enterableRooms.begin();

	int size = std::min(10, (int)enterableRooms.size());
	packet->roomCount = (Poco::UInt8)size;
	for (int i = 0; i < size; ++i, ++it) {
		packet->rooms[i].roomNumber = (*it).second->getRoomNumber();
		packet->rooms[i].limitTime = (*it).second->getLimitTime();
		packet->rooms[i].isFull = 0;
		packet->rooms[i].player1 = (*it).second->getUsers().front()->getIndex();
		packet->rooms[i].player2 = 0;
	}

	packet->packetSize += (1 + sizeof(ROOM) * size);
}