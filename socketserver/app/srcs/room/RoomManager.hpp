#pragma once

#include <set>
#include <list>
#include <vector>
#include <map>
#include "Room.hpp"
/**
 * @brief Room를 관리하는 매니저 클래스입니다.
 */
class RoomManager
{
	public:
		RoomManager();
		~RoomManager();

		void init(Poco::UInt32 maxRoomCount, Poco::UInt32 maxUserCount);
		Poco::Int32 takeInactiveRoomIndex(); 
		void createRoom(Poco::UInt32 roomIndex, User *user);
		std::map<Poco::UInt32, Room*> getEnterableRooms();

	private:
		std::set<Poco::UInt32> _inactiveRoomIndexes;
		std::vector<Room*> _roomPool;
		std::list<Room*> _activeRooms;
		std::map<Poco::UInt32, Room*> _enterableRooms;
		Poco::UInt32 _maxRoomCount;
		Poco::UInt32 _currentRoomCount;
};

