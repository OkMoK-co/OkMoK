#include "RoomManager.hpp"

RoomManager::RoomManager()
{

}

RoomManager::~RoomManager()
{

}

std::vector<Room*> RoomManager::getRoomPool()
{
	return _roomPool;
}

std::map<Poco::Int32, Room*> RoomManager::getEnterableRooms()
{
	return _enterableRooms;
}

void RoomManager::init(Poco::UInt32 maxRoomCount, Poco::UInt32 maxUserCount)
{
	_maxRoomCount = maxRoomCount;
	_currentRoomCount = 0;
	_roomPool = std::vector<Room*>(_maxRoomCount);

	for (Poco::UInt32 i = 0; i < _maxRoomCount; i++)
	{
		_inactiveRoomIndexes.insert(i);
		_roomPool[i] = new Room(i, maxUserCount);
	}
}

Room *RoomManager::takeRoomByRoomIndex(Poco::Int32 roomIndex)
{
	return _roomPool[roomIndex];
}

Poco::Int32 RoomManager::takeInactiveRoomIndex()
{
	std::set<Poco::Int32>::iterator it = _inactiveRoomIndexes.begin();
	if (it == _inactiveRoomIndexes.end())
	{
		return (-1);
	}

	Poco::Int32 index = *it;
	_inactiveRoomIndexes.erase(it);

	return index;
}

void RoomManager::createRoom(Poco::Int32 roomIndex, User *user)
{
	_roomPool[roomIndex]->enterUser(user);
	_activeRooms.push_back(_roomPool[roomIndex]);
	_enterableRooms[roomIndex] = _roomPool[roomIndex];
}

void RoomManager::deleteRoom(Poco::Int32 roomIndex)
{
	_enterableRooms.erase(roomIndex);
	_activeRooms.remove(_roomPool[roomIndex]);
	_inactiveRoomIndexes.insert(roomIndex);
}

PACKET_ERROR_CODE RoomManager::enterRoom(Poco::Int32 roomIndex, User *user)
{
	if (user->getRoomIndex() > -1)
	{
		return PACKET_ERROR_CODE::ROOM_ERROR;
	}
	if (roomIndex < 0 || roomIndex > _maxRoomCount)
	{
		return PACKET_ERROR_CODE::ROOM_ERROR;
	}

	Room *room = _roomPool[roomIndex];
	if (room->getCurrentUserCount() == 0 || !(room->getCurrentUserCount() < room->getMaxUserCount()))
	{
		return PACKET_ERROR_CODE::ROOM_ERROR;
	}

	_enterableRooms.erase(roomIndex);
	room->enterUser(user);

	return PACKET_ERROR_CODE::NONE;
}

void RoomManager::exitRoom(Poco::Int32 roomIndex, User *user)
{
	_roomPool[roomIndex]->leaveUser(user);

	if (_roomPool[roomIndex]->getCurrentUserCount() == 0)
	{
		deleteRoom(roomIndex);
		return ;
	}

	_enterableRooms[roomIndex] = _roomPool[roomIndex];
}
