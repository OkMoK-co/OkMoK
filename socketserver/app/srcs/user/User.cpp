#include "User.hpp"

User::User()
{

}

User::~User()
{

}

Poco::Int32 User::getIndex()
{
    return _index;
}

Poco::Int64 User::getUserId() 
{
    return _userId;
}

Poco::Int32 User::getRoomIndex()
{
		return _roomIndex;
}

Poco::Int32 User::getGameIndex()
{
    return _gameIndex;
}

void User::setGameIndex(Poco::Int32 gameIndex)
{
    _gameIndex = gameIndex;
}

void User::enterRoom(Poco::Int32 roomIndex)
{
    _roomIndex = roomIndex;
}

void User::leaveRoom()
{
    _roomIndex = -1;
}

void User::login(Poco::UInt32 connectIndex)
{
    _index = connectIndex;
    _userId = connectIndex + 1;
}

void User::logout()
{
    _index = -1;
    _userId = 0;
    _roomIndex = -1;
    _gameIndex = -1;
}

