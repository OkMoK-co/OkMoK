#include "RoomManager.hpp"

/**
 * @brief 패킷 ID별 처리할 함수를 등록합니다.
 * @param[in] maxSessionCount 서버가 최대 허용할 클라이언트의 수 입니다.
 */

RoomManager::RoomManager() 
{

}

RoomManager::~RoomManager() 
{
	
}

std::vector<Room*> RoomManager::getRoomPool() {
	return _roomPool;
}

std::map<Poco::UInt32, Room*> RoomManager::getEnterableRooms() {
	return _enterableRooms;
}

void RoomManager::init(Poco::UInt32 maxRoomCount, Poco::UInt32 maxUserCount)
{
	_maxRoomCount = maxRoomCount;
	_currentRoomCount = 0;
	_roomPool = std::vector<Room*>(_maxRoomCount);

	for (Poco::UInt32 i = 0; i < _maxRoomCount; i++) {
		_inactiveRoomIndexes.insert(i);
		_roomPool[i] = new Room(i, maxUserCount);
	}
}

Poco::Int32 RoomManager::takeInactiveRoomIndex()
{
	std::set<Poco::UInt32>::iterator it = _inactiveRoomIndexes.begin();
	if (it == _inactiveRoomIndexes.end())
		return (-1);
	Poco::UInt32 index = *it;
	_inactiveRoomIndexes.erase(it);
	return index;
}

void RoomManager::createRoom(Poco::UInt32 roomIndex, User *user)
{
	_roomPool[roomIndex]->enterUser(user);
	_activeRooms.push_back(_roomPool[roomIndex]);
	_enterableRooms[roomIndex] = _roomPool[roomIndex];
}

void RoomManager::deleteRoom(Poco::UInt32 roomIndex)
{
	_enterableRooms.erase(roomIndex);
	_activeRooms.remove(_roomPool[roomIndex]);
	_inactiveRoomIndexes.insert(roomIndex);
}

void RoomManager::exitRoom(Poco::UInt32 roomIndex, User *user)
{
	_roomPool[roomIndex]->leaveUser(user);

	if (_roomPool[roomIndex]->getCurrentUserCount() == 0) {
		deleteRoom(roomIndex);
		return ;
	}
	_enterableRooms[roomIndex] = _roomPool[roomIndex];
}