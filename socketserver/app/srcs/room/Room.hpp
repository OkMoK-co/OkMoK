#pragma once

#include <Poco/Types.h>
#include <list>
#include "../user/User.hpp"

class Room 
{
    public:
        Room();
        Room(Poco::UInt32 roomIndex, Poco::UInt32 maxUserCount);
        ~Room();

        Poco::UInt32 getRoomIndex();
        Poco::UInt32 getRoomNumber();
        Poco::UInt8 getLimitTime();
        Poco::UInt32 getMaxUserCount();
        Poco::UInt32 getCurrentUserCount();
        std::list<User*> getUsers();

        void enterUser(User *user);
        void leaveUser(User *user);

    private:
        Poco::UInt32 _roomIndex;
        Poco::UInt32 _roomNumber;
        Poco::UInt8 _limitTime;
        Poco::UInt32 _maxUserCount;
        Poco::UInt32 _currentUserCount;
        std::list<User*> _users;
};