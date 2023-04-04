#include "Game.hpp"


Game::Game(Poco::UInt32 gameIndex, Poco::UInt8 limitTime)
{
	_gameIndex = gameIndex;
	_gameNumber = 0;
	_limitTime = limitTime;
	_player1 = NULL;
	_player2 = NULL;
}

Game::~Game()
{
	
}

void Game::startGame(Poco::UInt64 gameNumber, User *player1, User *player2)
{
	_gameNumber = gameNumber;
	_player1 = player1;
	_player2 = player2;
	_player1->setGameIndex(_gameIndex);
	_player2->setGameIndex(_gameIndex);
	_currentPlayer = 1;
}

void Game::endGame()
{
	_gameNumber = 0;
	_player1->setGameIndex(-1);
	_player2->setGameIndex(-1);
	_player1 = NULL;
	_player2 = NULL;
	_currentPlayer = 0;
	_puts.clear();
	memset(_gameBoard, 0, 15 * 15);
}

void Game::addPut(Poco::Int8 x, Poco::Int8 y, Poco::UInt64 time)
{
	struct PutInfo put = {x, y, _currentPlayer, time};
	_puts.push_back(put);
	_gameBoard[y][x] = _currentPlayer;
	_currentPlayer = 3 - _currentPlayer;
}

bool Game::isCurrentPlayer(User *player)
{
	if (_currentPlayer == 1)
	{
		return _player1 == player;
	}
	if (_currentPlayer == 2)
	{
		return _player2 == player;
	}
	return false;
}

bool Game::isValidPut(Poco::UInt8 x, Poco::UInt8 y)
{
	if (x > 14 || y > 14 || x < 0 || y < 0)
	{
		return false;
	}
	if (_gameBoard[y][x])
	{
		return false;
	}
	return true;
}
