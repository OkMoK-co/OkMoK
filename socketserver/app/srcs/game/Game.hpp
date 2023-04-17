#pragma once

#include <list>
#include <chrono>
#include <Poco/Types.h>
#include <dispatch/dispatch.h>

#include "Okmok.hpp"
#include "../user/User.hpp"
#include "GameTimer.hpp"

struct PutInfo
{
	Poco::Int8 x;
	Poco::Int8 y;
	Poco::UInt8 player;
	Poco::UInt64 time;
};

class Game
{
	public :
		Game(Poco::Int32 gameIndex);
		~Game();

		PutInfo getPutsBack();
		Poco::UInt64 getStartTime();
		Poco::UInt8 getCurrentPlayer();
		Poco::UInt32 getCurrentTurn();

		Poco::UInt8 takePlayerByUser(User *user);
		User*   takeRivalUserByUser(User *user);

		void startGame(Poco::Int32 gameId, User *player1, User *player2);
		void endGame();
		void addPut(Poco::Int8 x, Poco::Int8 y);
		void timeOver();

		bool isCurrentPlayer(User *player);
		bool isValidPut(Poco::Int8 x, Poco::Int8 y);
		bool checkDraw();
		bool checkVictory();

	private:
		Poco::UInt64 takeCurrentTime();
		Poco::Int32 _gameIndex;
		Poco::Int32 _gameId;
		Poco::UInt64 _startTime;
		GameTimer _gameTimer;
		User *_player1;
		User *_player2;
		Poco::UInt8 _currentPlayer;
		Poco::UInt16 _currentStoneCount;
		std::list<PutInfo> _puts;
		Poco::UInt8 _gameBoard[15][15];
};
