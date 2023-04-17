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
		std::vector<Game *> getGamePool();

		void init(Poco::UInt32 maxGameCount);
		Game *takeGameByGameIndex(Poco::Int32 gameIndex);

		void createGame(Poco::Int32 roomIndex, User *player1, User *player2);
		PACKET_ERROR_CODE putOkmok(User *user, Poco::Int8 x, Poco::Int8 y, Poco::UInt64 time);
		PACKET_ERROR_CODE timeOutOkmok(TimeOutInfo *timeOutInfo);

		/* 게임 결과 확인 */
		Poco::Int8 checkWinner(Poco::Int32 gameIndex);

private:
		Poco::UInt32 _maxGameCount;
		std::vector<Game *> _gamePool;
		Poco::Int32 _currentGameId;
		GameTimer _gameTimer;
};

