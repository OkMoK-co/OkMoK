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
    _number = connectIndex + 1;
}

void User::logout()
{
    _index = -1;
    _roomIndex = -1;
    _number = 0;
}

Poco::UInt32 User::getIndex()
{
    return _index;
}

Poco::UInt64 User::getNumber() 
{
    return _number;
}
