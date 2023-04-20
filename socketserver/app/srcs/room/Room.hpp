#pragma once

#include "../util/PocoType.hpp"
#include <list>
#include "../user/User.hpp"

class Room 
{
    public:
        Room();
        Room(Poco::Int32 roomIndex, Poco::UInt32 maxUserCount);
        ~Room();

        Poco::Int32 getRoomIndex();
        Poco::Int32 getRoomNumber();
        Poco::UInt8 getLimitTime();
        Poco::UInt32 getMaxUserCount();
        Poco::UInt32 getCurrentUserCount();
        std::list<User*> getUsers();

        void enterUser(User *user);
        void leaveUser(User *user);

    private:
        Poco::Int32 _roomIndex;
        Poco::Int32 _roomNumber;
        Poco::UInt8 _limitTime;
        Poco::UInt32 _maxUserCount;
        Poco::UInt32 _currentUserCount;
        std::list<User*> _users;
};
