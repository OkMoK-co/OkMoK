#include "Room.hpp"

Room::Room()
{

}

Room::Room(Poco::UInt32 roomIndex, Poco::UInt32 maxUserCount)
{
    _roomIndex = roomIndex;
    _roomNumber = _roomIndex + 1;
    _limitTime = 30;
    _maxUserCount = maxUserCount;
    _currentUserCount = 0;
}

Room::~Room()
{

}

Poco::UInt32 Room::getRoomIndex()
{
    return _roomIndex;
}

Poco::UInt32 Room::getRoomNumber()
{
    return _roomNumber;
}

Poco::UInt8 Room::getLimitTime()
{
    return _limitTime;
}

Poco::UInt32 Room::getMaxUserCount()
{
    return _maxUserCount;
}

Poco::UInt32 Room::getCurrentUserCount()
{
    return _currentUserCount;
}

std::list<User*> Room::getUsers()
{
    return _users;
}


void Room::enterUser(User *user)
{
    if (_currentUserCount >= _maxUserCount)
		{
        /* 방 들어가기 실패 패킷 보내기*/
        return ;
    }
		
    _users.push_back(user);
    user->enterRoom(_roomIndex);
    _currentUserCount = _users.size();
}

void Room::leaveUser(User *user)
{
    if (_currentUserCount <= 0)
		{
        /* 방 나가기 실패 패킷 보내기*/
        return ;
    }

    _users.remove(user);
    user->leaveRoom();
    _currentUserCount = _users.size();
}