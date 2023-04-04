#pragma once

#include <Poco/Types.h>
#include <list>
#include "../user/User.hpp"

struct PutInfo;

class Game 
{
	public :
		Game(Poco::UInt32 gameIndex, Poco::UInt8 limitTime);
		~Game();

		void startGame(Poco::UInt64 gameNumber, User *player1, User *player2);
		void endGame();
		void addPut(Poco::Int8 x, Poco::Int8 y, Poco::UInt64 time);
		bool isCurrentPlayer(User *player);
		bool isValidPut(Poco::UInt8 x, Poco::UInt8 y);

	private:
		Poco::UInt32 _gameIndex;
		Poco::UInt64 _gameNumber;
		Poco::UInt8 _limitTime;
		User *_player1;
		User *_player2;
		Poco::UInt8 _currentPlayer;
		std::list<PutInfo> _puts;
		Poco::UInt8 _gameBoard[15][15] = {0, };
};

struct PutInfo
{
	Poco::Int8 x;
	Poco::Int8 y;
	Poco::UInt8 player;
	Poco::UInt64 time;
};
