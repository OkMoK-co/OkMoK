#include "User.hpp"

User::User()
{

}

User::~User()
{

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
}

void User::logout()
{
    _index = -1;
    _roomIndex = -1;
}

Poco::UInt32 User::getIndex()
{
    return _index;
}