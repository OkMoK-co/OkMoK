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

std::map<Poco::UInt32, Room*> RoomManager::getEnterableRooms() {
	return _enterableRooms;
}