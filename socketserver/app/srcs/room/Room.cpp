#include "Room.hpp"

Room::Room()
{

}

Room::Room(Poco::Int32 roomIndex, Poco::UInt32 maxUserCount)
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

Poco::Int32 Room::getRoomIndex()
{
    return _roomIndex;
}

Poco::Int32 Room::getRoomNumber()
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
    _users.push_back(user);
    user->enterRoom(_roomIndex);
    _currentUserCount = _users.size();
}

void Room::leaveUser(User *user)
{
		_users.remove(user);
    user->unReady();
    user->leaveRoom();
    _currentUserCount = _users.size();
}
