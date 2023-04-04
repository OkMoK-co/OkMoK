#pragma once

/**
 * @brief Game을 관리하는 매니저 클래스입니다.
 */

#include <vector>
#include "../packet/PacketErrorCode.hpp"
#include "Game.hpp"

class GameManager
{
	public:
		void init(Poco::Int32 maxGameCount);
		void createGame(Poco::UInt32 gameIndex, User *player1, User *player2);
		PACKET_ERROR_CODE putOkmok(User *user, Poco::UInt8 x, Poco::UInt8 y, Poco::UInt64 time);

	private:
		Poco::Int32 _maxGameCount;
		std::vector<Game *> _gamePool;
		Poco::UInt64 _currentGameNumber;
};

