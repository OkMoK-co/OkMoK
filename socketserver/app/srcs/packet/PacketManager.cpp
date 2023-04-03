#include <utility>
#include <cstring>

#include <iostream>
#include "Packet.hpp"
#include "PacketManager.hpp"

void PacketManager::init(const int maxSessionCount)
{
	_roomManager.init(maxSessionCount, 2);
	_userManager.init(maxSessionCount);

	_recvFuntionDictionary = std::unordered_map<int, PROCESS_RECV_PACKET_FUNCTION>();
	_recvFuntionDictionary[(int)PACKET_ID::DEV_ECHO] = &PacketManager::processDevEcho;
	
	_recvFuntionDictionary[(int)PACKET_ID::LOGIN_REQUEST] = &PacketManager::processLogin;
	_recvFuntionDictionary[(int)PACKET_ID::ROOM_MAIN_REQUEST] = &PacketManager::processEnterMain;
	_recvFuntionDictionary[(int)PACKET_ID::ROOM_CREATE_REQUEST] = &PacketManager::processCreateRoom;
	_recvFuntionDictionary[(int)PACKET_ID::ROOM_ENTER_REQUEST] = &PacketManager::processEnterRoom;
	_recvFuntionDictionary[(int)PACKET_ID::ROOM_INFO_REQUEST] = &PacketManager::processInfoRoom;
	_recvFuntionDictionary[(int)PACKET_ID::ROOM_EXIT_REQUEST] = &PacketManager::processExitRoom;

	_recvFuntionDictionary[(int)PACKET_ID::GAME_PUT_REQUEST] = &PacketManager::processPutGame;

}

void PacketManager::process(int connectionIndex, const Poco::UInt16 packetID, char* pBuf, Poco::Int16 bodySize)
{
	auto iter = _recvFuntionDictionary.find(packetID);
	if (iter != _recvFuntionDictionary.end())
	{
		(this->*(iter->second))(connectionIndex, pBuf, bodySize);
	}
}

template <typename T>
T PacketManager::makePacketHeader(Poco::UInt16 packetID)
{
	T packet;
	packet.packetID = packetID;
	packet.packetSize = sizeof(T);
	packet.type = 1;

	return packet;
}

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

void PacketManager::processLogin(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize)
{
	LOGIN_RESPONSE_PACKET packet = makePacketHeader<LOGIN_RESPONSE_PACKET>((Poco::UInt16)PACKET_ID::LOGIN_RESPONSE);
	User *user = _userManager.takeUserByConnIndex(connIndex);

	packet.userId = user->getUserId();
	sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);
}

template <typename T>
void PacketManager::makeMainRooms(T &packet) {
	std::map<Poco::UInt32, Room*> enterableRooms = _roomManager.getEnterableRooms();

	std::map<Poco::UInt32, Room*>::iterator it = enterableRooms.begin();
	int size = std::min(10, (int)enterableRooms.size());
	for (int i = 0; i < size; ++i, ++it)
	{
		packet.rooms[i].roomNumber = (*it).second->getRoomNumber();
		packet.rooms[i].limitTime = (*it).second->getLimitTime();
		packet.rooms[i].isFull = 0;
		packet.rooms[i].player1 = (*it).second->getUsers().front()->getUserId();
		packet.rooms[i].player2 = 0;
	}

	packet.roomCount = (Poco::UInt8)size;
	packet.packetSize = sizeof(PACKET_HEADER) + (1 + sizeof(ROOM) * size);
}

void PacketManager::broadcastMainRooms() {
	R_ROOM_LIST_RESPONSE_PACKET broadcastPacket = makePacketHeader<R_ROOM_LIST_RESPONSE_PACKET>((Poco::UInt16)PACKET_ID::R_ROOM_LIST_RESPONSE);
	
	makeMainRooms(broadcastPacket);
	
	std::list<User *> mainUsers = _userManager.getMainUsers();
	for (User *user : mainUsers)
	{
		sendPacketFunc(user->getIndex(), (char *)&broadcastPacket, broadcastPacket.packetSize);
	}
}

void PacketManager::processEnterMain(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize)
{
	ROOM_MAIN_RESPONSE_PACKET packet = makePacketHeader<ROOM_MAIN_RESPONSE_PACKET>((Poco::UInt16)PACKET_ID::ROOM_MAIN_RESPONSE);

	makeMainRooms(packet);
	
	User *user = _userManager.takeUserByConnIndex(connIndex);
	_userManager.addMainUsers(user);
	sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);
}

void PacketManager::processCreateRoom(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize)
{
	ROOM_CREATE_RESPONSE_PACKET packet = makePacketHeader<ROOM_CREATE_RESPONSE_PACKET>((Poco::UInt16)PACKET_ID::ROOM_CREATE_RESPONSE);
	
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
	
	broadcastMainRooms();
}

void PacketManager::processEnterRoom(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize)
{
	
}

void PacketManager::processInfoRoom(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize)
{
	
}

void PacketManager::processExitRoom(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize)
{
	ROOM_EXIT_RESPONSE_PACKET packet = makePacketHeader<ROOM_EXIT_RESPONSE_PACKET>((Poco::UInt16)PACKET_ID::ROOM_EXIT_RESPONSE);
	
	User *user = _userManager.takeUserByConnIndex(connIndex);

	Poco::Int32 roomIndex = user->getRoomIndex();
	if(roomIndex == -1)
	{
		packet.type = (Poco::UInt8)PACKET_OPTION::FAIL;	
		sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);
		return ;
	}

	_roomManager.exitRoom((Poco::UInt32)roomIndex, user);
	sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);

	broadcastMainRooms();

	/* 방에 남은 인원에게 실시간 방 정보 변경 코드 */
	/* todo : INFO_ROOM 과 함수 통일 시켜줄 예정 */
	Room* room = _roomManager.getRoomPool()[roomIndex];
	if (room->getCurrentUserCount()) 
	{
		R_ROOM_INFO_RESPONSE broadcastPacket = makePacketHeader<R_ROOM_INFO_RESPONSE>((Poco::UInt16)PACKET_ID::R_ROOM_INFO_RESPONSE);

		broadcastPacket.roomDetail.roomNumber = room->getRoomNumber();
		broadcastPacket.roomDetail.limitTime = room->getLimitTime();
		broadcastPacket.roomDetail.player1 = room->getUsers().front()->getIndex();
		broadcastPacket.roomDetail.player2 = 0;

		std::list<User*> restUsers = room->getUsers();
		for (User *user : restUsers)
		{
			sendPacketFunc(user->getIndex(), (char *)&broadcastPacket, broadcastPacket.packetSize);
		}
	}
}

void PacketManager::processPutGame(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize)
{
	GAME_PUT_RESONSE_PACKET packet = makePacketHeader<GAME_PUT_RESONSE_PACKET>((Poco::UInt16)PACKET_ID::GAME_PUT_RESPONSE);
	sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);
}
