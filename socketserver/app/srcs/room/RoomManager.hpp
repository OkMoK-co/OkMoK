#pragma once

#include <set>
#include <list>
#include <vector>
#include <map>
#include "Room.hpp"
#include "../packet/PacketErrorCode.hpp"
/**
 * @brief Room를 관리하는 매니저 클래스입니다.
 */
class RoomManager
{
	public:
		RoomManager();
		~RoomManager();

		std::vector<Room*> getRoomPool();
		std::map<Poco::Int32, Room*> getEnterableRooms();

		void init(Poco::UInt32 maxRoomCount, Poco::UInt32 maxUserCount);
		Room *takeRoomByRoomIndex(Poco::Int32 roomIndex);
		Poco::Int32 takeInactiveRoomIndex(); 
		void createRoom(Poco::Int32 roomIndex, User *user);
		void deleteRoom(Poco::Int32 roomIndex);
		PACKET_ERROR_CODE enterRoom(Poco::Int32 roomIndex, User *user);
		void exitRoom(Poco::Int32 roomIndex, User *user);

	private:
		std::set<Poco::Int32> _inactiveRoomIndexes;
		std::vector<Room*> _roomPool;
		std::list<Room*> _activeRooms;
		std::map<Poco::Int32, Room*> _enterableRooms;
		Poco::UInt32 _maxRoomCount;
		Poco::UInt32 _currentRoomCount;
};
