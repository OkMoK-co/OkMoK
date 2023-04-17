#include <utility>
#include <cstring>

#include <iostream>
#include "Packet.hpp"
#include "PacketManager.hpp"

void PacketManager::init(const int maxSessionCount)
{
	_roomManager.init(maxSessionCount, 2);
	_userManager.init(maxSessionCount);
	_gameManager.init(maxSessionCount);

	_recvFuntionDictionary = std::unordered_map<int, PROCESS_RECV_PACKET_FUNCTION>();
	_recvFuntionDictionary[(int)PACKET_ID::INTERNAL_CLOSE] = &PacketManager::processDisconnected;
	_recvFuntionDictionary[(int)PACKET_ID::INTERNAL_GAME_TIME_OUT] = &PacketManager::processTimeOutGame;
	_recvFuntionDictionary[(int)PACKET_ID::DEV_ECHO] = &PacketManager::processDevEcho;

	_recvFuntionDictionary[(int)PACKET_ID::LOGIN_REQUEST] = &PacketManager::processLogin;
	_recvFuntionDictionary[(int)PACKET_ID::ROOM_MAIN_REQUEST] = &PacketManager::processEnterMain;
	_recvFuntionDictionary[(int)PACKET_ID::ROOM_CREATE_REQUEST] = &PacketManager::processCreateRoom;
	_recvFuntionDictionary[(int)PACKET_ID::ROOM_ENTER_REQUEST] = &PacketManager::processEnterRoom;
	_recvFuntionDictionary[(int)PACKET_ID::ROOM_INFO_REQUEST] = &PacketManager::processInfoRoom;
	_recvFuntionDictionary[(int)PACKET_ID::ROOM_EXIT_REQUEST] = &PacketManager::processExitRoom;
	_recvFuntionDictionary[(int)PACKET_ID::ROOM_KICKOUT_REQUEST] = &PacketManager::processKickoutUser;
	_recvFuntionDictionary[(int)PACKET_ID::ROOM_READY_REQUEST] = &PacketManager::processReadyUser;

	_recvFuntionDictionary[(int)PACKET_ID::GAME_PUT_REQUEST] = &PacketManager::processPutGame;
	_recvFuntionDictionary[(int)PACKET_ID::GAME_GIVEUP_REQUEST] = &PacketManager::processGiveUpGame;
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
	std::map<Poco::Int32, Room*> enterableRooms = _roomManager.getEnterableRooms();

	std::map<Poco::Int32, Room*>::iterator it = enterableRooms.begin();
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

void PacketManager::broadcastMainRooms()
{
	R_ROOM_LIST_RESPONSE_PACKET broadcastPacket = makePacketHeader<R_ROOM_LIST_RESPONSE_PACKET>((Poco::UInt16)PACKET_ID::R_ROOM_LIST_RESPONSE);

	makeMainRooms(broadcastPacket);

	std::list<User *> mainUsers = _userManager.getMainUsers();
	for (User *user : mainUsers)
	{
		sendPacketFunc(user->getIndex(), (char *)&broadcastPacket, broadcastPacket.packetSize);
	}
}

void PacketManager::broadcastPutInfo(Poco::Int32 roomIndex, PutInfo putInfo, Poco::Int8 result)
{
	R_GAME_PUT_RESPONSE_PACKET broadcastPacket = makePacketHeader<R_GAME_PUT_RESPONSE_PACKET>((Poco::UInt16)PACKET_ID::R_GAME_PUT_RESPONSE);
	makePutGame(broadcastPacket, putInfo, result);

	std::list<User *> users = _roomManager.takeRoomByRoomIndex(roomIndex)->getUsers();
	for (User *user : users)
	{
		sendPacketFunc(user->getIndex(), (char *)&broadcastPacket, broadcastPacket.packetSize);
	}
}

void PacketManager::broadcastGameStart(Poco::Int32 gameIndex, std::list<User*>users)
{
	R_GAME_START_RESPONSE_PACKET broadcastPacket = makePacketHeader<R_GAME_START_RESPONSE_PACKET>((Poco::UInt16)PACKET_ID::R_GAME_START_RESPONSE);
	broadcastPacket.startTime = _gameManager.takeGameByGameIndex(gameIndex)->getStartTime();
	for (User *user: users)
	{
		sendPacketFunc(user->getIndex(), (char *)&broadcastPacket, broadcastPacket.packetSize);
	}
}

void PacketManager::broadcastGameResult(Poco::Int32 roomIndex, Poco::Int8 result)
{
	R_GAME_RESULT_RESPONSE_PACKET broadcastPacket = makePacketHeader<R_GAME_RESULT_RESPONSE_PACKET>((Poco::UInt16)PACKET_ID::R_GAME_RESULT_RESPONSE);

	makeGameResult(broadcastPacket, result);

	std::list<User *> users = _roomManager.takeRoomByRoomIndex(roomIndex)->getUsers();
	for (User *user : users)
	{
		sendPacketFunc(user->getIndex(), (char *)&broadcastPacket, broadcastPacket.packetSize);
	}
}

void PacketManager::processDisconnected(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize)
{
	User *user = _userManager.takeUserByConnIndex(connIndex);

	Poco::Int32 roomIndex = user->getRoomIndex();
	Poco::Int32 gameIndex = user->getGameIndex();

	if (gameIndex != -1)
	{
		Game *game = _gameManager.takeGameByGameIndex(gameIndex);
		Poco::Int8 result = 3 - game->takePlayerByUser(user);

		R_GAME_RESULT_RESPONSE_PACKET gameResultPacket = makePacketHeader<R_GAME_RESULT_RESPONSE_PACKET>((Poco::UInt16)PACKET_ID::R_GAME_RESULT_RESPONSE);

		makeGameResult(gameResultPacket, result);

		User *rivalUser = game->takeRivalUserByUser(user);
		sendPacketFunc(rivalUser->getIndex(), (char *)&gameResultPacket, gameResultPacket.packetSize);

		game->endGame();
	}

	if (roomIndex != -1)
	{
		_roomManager.exitRoom(roomIndex, user);
		broadcastMainRooms();
		broadcastInfoRoom(roomIndex);
	}

	_userManager.deleteMainUsers(user);
	user->logout();
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
	_roomManager.createRoom((Poco::Int32)roomIndex, user);
	_userManager.deleteMainUsers(user);
	sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);
	broadcastMainRooms();
}

template <typename T>
void PacketManager::makeInfoRoom(T &packet, Poco::Int32 roomIndex)
{
	Room *room = _roomManager.takeRoomByRoomIndex(roomIndex);

	packet.roomInfo.roomNumber = room->getRoomNumber();
	packet.roomInfo.limitTime = room->getLimitTime();
	packet.roomInfo.player1 = room->getUsers().front()->getUserId();
	packet.roomInfo.player2 = room->getUsers().size() == 2 ? room->getUsers().back()->getUserId() : 0;
}

void PacketManager::broadcastInfoRoom(Poco::Int32 roomIndex)
{
	Room *room = _roomManager.takeRoomByRoomIndex(roomIndex);
	if (room->getCurrentUserCount() == 0)
	{
		return ;
	}

	R_ROOM_INFO_RESPONSE_PACKET packet = makePacketHeader<R_ROOM_INFO_RESPONSE_PACKET>((Poco::UInt16)PACKET_ID::R_ROOM_INFO_RESPONSE);

	makeInfoRoom(packet, roomIndex);

	std::list<User*> restUsers = room->getUsers();
	for (User *user : restUsers)
	{
		sendPacketFunc(user->getIndex(), (char *)&packet, packet.packetSize);
	}
}

void PacketManager::processEnterRoom(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize)
{
	ROOM_ENTER_RESPONSE_PACKET packet = makePacketHeader<ROOM_ENTER_RESPONSE_PACKET>((Poco::UInt16)PACKET_ID::ROOM_ENTER_RESPONSE);
	Poco::Int32 roomIndex = (reinterpret_cast<ROOM_ENTER_REQUEST_PACKET *>(pBodyData))->roomNumber - 1;

	User *user = _userManager.takeUserByConnIndex(connIndex);
	PACKET_ERROR_CODE code = _roomManager.enterRoom(roomIndex, user);
	if (code != PACKET_ERROR_CODE::NONE)
	{
		packet.type = (Poco::UInt8)PACKET_OPTION::FAIL;
		sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);
		return ;
	}

	_userManager.deleteMainUsers(user);

	broadcastMainRooms();
	broadcastInfoRoom(roomIndex);

	sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);
}

void PacketManager::processInfoRoom(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize)
{
	ROOM_INFO_RESPONSE_PACKET packet = makePacketHeader<ROOM_INFO_RESPONSE_PACKET>((Poco::UInt16)PACKET_ID::ROOM_INFO_RESPONSE);

	Poco::Int32 roomIndex = _userManager.takeUserByConnIndex(connIndex)->getRoomIndex();
	if(roomIndex == -1)
	{
		packet.type = (Poco::UInt8)PACKET_OPTION::FAIL;
		sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);
		return ;
	}

	makeInfoRoom(packet, roomIndex);
	sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);
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

	Poco::Int32 gameIndex = user->getGameIndex();
	if(gameIndex != -1)
	{
		packet.type = (Poco::UInt8)PACKET_OPTION::FAIL;
		sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);
		return ;
	}

	_roomManager.exitRoom((Poco::Int32)roomIndex, user);
	sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);

	broadcastMainRooms();
	broadcastInfoRoom(roomIndex);
}

void PacketManager::processKickoutUser(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize)
{
	ROOM_KICKOUT_RESPONSE_PACKET packet = makePacketHeader<ROOM_KICKOUT_RESPONSE_PACKET>((Poco::UInt16)PACKET_ID::ROOM_KICKOUT_RESPONSE);

	User *user = _userManager.takeUserByConnIndex(connIndex);
	Poco::Int32 roomIndex = user->getRoomIndex();
	if(roomIndex == -1)
	{
		packet.type = (Poco::UInt8)PACKET_OPTION::FAIL;
		sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);
		return ;
	}

	std::list<User*> users = _roomManager.takeRoomByRoomIndex(roomIndex)->getUsers();
	if (users.front() != user || users.size() != 2)
	{
		packet.type = (Poco::UInt8)PACKET_OPTION::FAIL;
		sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);
		return ;
	}

	Poco::Int32 gameIndex = user->getGameIndex();
	if(gameIndex != -1)
	{
		packet.type = (Poco::UInt8)PACKET_OPTION::FAIL;
		sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);
		return ;
	}

	R_ROOM_EXIT_RESPONSE_PACKET kickedoutpacket = makePacketHeader<R_ROOM_EXIT_RESPONSE_PACKET>((Poco::UInt16)PACKET_ID::R_ROOM_EXIT_RESPONSE);

	User *kickedoutUser = users.back();
	_roomManager.exitRoom((Poco::Int32)roomIndex, kickedoutUser);
	sendPacketFunc(kickedoutUser->getIndex(), (char *)&kickedoutpacket, kickedoutpacket.packetSize);

	sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);

	broadcastMainRooms();
	broadcastInfoRoom(roomIndex);
}

void PacketManager::processReadyUser(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize)
{
	ROOM_READY_RESPONSE_PACKET packet = makePacketHeader<ROOM_READY_RESPONSE_PACKET>((Poco::UInt16)PACKET_ID::ROOM_READY_RESPONSE);

	User *user = _userManager.takeUserByConnIndex(connIndex);

	Poco::Int32 roomIndex = user->getRoomIndex();
	if(roomIndex == -1)
	{
		packet.type = (Poco::UInt8)PACKET_OPTION::FAIL;
		sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);
		return ;
	}

	Poco::Int32 gameIndex = user->getGameIndex();
	if(gameIndex != -1)
	{
		packet.type = (Poco::UInt8)PACKET_OPTION::FAIL;
		sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);
		return ;
	}

	user->ready();
	sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);

	std::list<User*> users = _roomManager.takeRoomByRoomIndex(roomIndex)->getUsers();
	if (users.size() == 2 && users.front()->getReady() && users.back()->getReady())
	{
		_gameManager.createGame(roomIndex, users.front(), users.back());
		broadcastGameStart(gameIndex, users);
	}
}

void PacketManager::makePutGame(R_GAME_PUT_RESPONSE_PACKET &packet, PutInfo &put, Poco::Int8 result)
{
	packet.x = put.x;
	packet.y = put.y;
	packet.player = put.player;
	packet.time = result ? 0 : put.time;
}

void PacketManager::makeGameResult(R_GAME_RESULT_RESPONSE_PACKET &packet, Poco::Int8 result)
{
	packet.result = result;
}

void PacketManager::processPutGame(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize)
{
	GAME_PUT_RESPONSE_PACKET packet = makePacketHeader<GAME_PUT_RESPONSE_PACKET>((Poco::UInt16)PACKET_ID::GAME_PUT_RESPONSE);
	GAME_PUT_REQUEST_PACKET *putReq = reinterpret_cast<GAME_PUT_REQUEST_PACKET *>(pBodyData);

	User *user = _userManager.takeUserByConnIndex(connIndex);
	Poco::Int32 roomIndex = user->getRoomIndex();
	if (roomIndex == -1)
	{
		packet.type = (Poco::UInt8)PACKET_OPTION::FAIL;
		sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);
		return;
	}

	PACKET_ERROR_CODE code = _gameManager.putOkmok(user, putReq->x, putReq->y, putReq->time);
	if (code != PACKET_ERROR_CODE::NONE)
	{
		packet.type = (Poco::UInt8)PACKET_OPTION::FAIL;
		sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);
		return ;
	}
	sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);

	Poco::Int32 gameIndex = user->getGameIndex();
	PutInfo putInfo = _gameManager.takeGameByGameIndex(gameIndex)->getPutsBack();
	Poco::Int8 result = _gameManager.checkWinner(gameIndex);

	broadcastPutInfo(roomIndex, putInfo, result);

	if (!result)
	{
		return;
	}

	broadcastGameResult(roomIndex, result);
}

void PacketManager::processGiveUpGame(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize)
{
	GAME_GIVEUP_RESPONSE_PACKET packet = makePacketHeader<GAME_GIVEUP_RESPONSE_PACKET>((Poco::UInt16)PACKET_ID::GAME_GIVEUP_RESPONSE);

	User *user = _userManager.takeUserByConnIndex(connIndex);

	Poco::Int32 roomIndex = user->getRoomIndex();
	if (roomIndex == -1)
	{
		packet.type = (Poco::UInt8)PACKET_OPTION::FAIL;
		sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);
		return;
	}

	Poco::Int32 gameIndex = user->getGameIndex();
	if (gameIndex == -1)
	{
		packet.type = (Poco::UInt8)PACKET_OPTION::FAIL;
		sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);
		return;
	}

	sendPacketFunc(connIndex, (char *)&packet, packet.packetSize);

	Game *game = _gameManager.takeGameByGameIndex(gameIndex);
	Poco::Int8 result = 3 - game->takePlayerByUser(user);

	broadcastGameResult(roomIndex, result);

	game->endGame();
}

void PacketManager::processTimeOutGame(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize)
{
	TimeOutInfo *timeOutInfo = reinterpret_cast<TimeOutInfo *>(pBodyData);

	if (_gameManager.timeOutOkmok(timeOutInfo) != PACKET_ERROR_CODE::NONE)
	{
		return ;
	}

	PutInfo putInfo = _gameManager.takeGameByGameIndex(timeOutInfo->gameIndex)->getPutsBack();
	broadcastPutInfo(timeOutInfo->gameIndex, putInfo, 0);
}
