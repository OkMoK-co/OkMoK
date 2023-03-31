#pragma once

#include <Poco/Types.h>

class User
{
    public:
        User();
        ~User();

        Poco::UInt32 getIndex();
        Poco::UInt64 getNumber();

        void enterRoom(Poco::Int32 roomIndex);
        void leaveRoom();
        void login(Poco::UInt32 connectIndex);
        void logout();
        
    private:
        Poco::UInt32 _index = -1;
        Poco::Int32 _roomIndex = -1;
        Poco::UInt64 _number = 0;
};
