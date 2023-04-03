#pragma once

#include <Poco/Types.h>

class User
{
    public:
        User();
        ~User();

        Poco::UInt32 getIndex();
        Poco::UInt64 getUserId();

        void enterRoom(Poco::Int32 roomIndex);
        void leaveRoom();
        void login(Poco::UInt32 connectIndex);
        void logout();
        
    private:
        Poco::Int32 _index;
        Poco::Int32 _roomIndex;
        Poco::UInt64 _userId;
};
