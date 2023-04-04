#pragma once

#include <Poco/Types.h>
#include <list>
#include "../user/User.hpp"

struct PutInfo;

class Game 
{
	public :
		Game(Poco::Int32 gameIndex, Poco::UInt8 limitTime);
		~Game();

		void startGame(Poco::Int32 gameId, User *player1, User *player2);
		void endGame();
		void addPut(Poco::Int8 x, Poco::Int8 y, Poco::UInt64 time);
		bool isCurrentPlayer(User *player);
		bool isValidPut(Poco::Int8 x, Poco::Int8 y);

	private:
		Poco::Int32 _gameIndex;
		Poco::Int32 _gameId;
		Poco::UInt8 _limitTime;
		User *_player1;
		User *_player2;
		Poco::UInt8 _currentPlayer;
		std::list<PutInfo> _puts;
		Poco::UInt8 _gameBoard[15][15];
};

struct PutInfo
{
	Poco::Int8 x;
	Poco::Int8 y;
	Poco::UInt8 player;
	Poco::UInt64 time;
};
