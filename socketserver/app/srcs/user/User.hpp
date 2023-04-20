#pragma once

#include "../util/PocoType.hpp"

class User
{
    public:
        User();
        ~User();

        Poco::Int32 getIndex();
        Poco::Int64 getUserId();
        Poco::Int32 getRoomIndex();
		Poco::Int8	getReady();
        Poco::Int32 getGameIndex();
        void setGameIndex(Poco::Int32 gameIndex);

        void enterRoom(Poco::Int32 roomIndex);
        void leaveRoom();
        void login(Poco::UInt32 connectIndex);
		void ready();
        void unReady();
        void logout();


    private:
        Poco::Int32 _index;
        Poco::Int64 _userId;
        Poco::Int32 _roomIndex;
		Poco::Int8	_ready;
        Poco::Int32 _gameIndex;
};
