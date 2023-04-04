#pragma once

#include <Poco/Types.h>

class User
{
    public:
        User();
        ~User();

        Poco::Int32 getIndex();
        Poco::UInt64 getUserId();
				Poco::Int32 getRoomIndex();
				Poco::Int32 getGameIndex();
        void setGameIndex(Poco::Int32 gameIndex);

        void enterRoom(Poco::Int32 roomIndex);
        void leaveRoom();
        void login(Poco::UInt32 connectIndex);
        void logout();

        
    private:
        Poco::Int32 _index;
        Poco::UInt64 _userId;
        Poco::Int32 _roomIndex;
        Poco::Int32 _gameIndex;
};
