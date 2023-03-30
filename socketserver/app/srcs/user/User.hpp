#pragma once

#include <Poco/Types.h>

class User
{
    public:
        User();
        ~User();

        void enterRoom(Poco::Int32 roomIndex);
        void leaveRoom();
        void login(Poco::UInt32 connectIndex);
        void logout();
        
        Poco::UInt32 getIndex();
        
    private:
        Poco::UInt32 _index = -1;
        Poco::Int32 _roomIndex = -1;
};