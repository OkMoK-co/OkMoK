#include "Game.hpp"

Game::Game(Poco::Int32 gameIndex, Poco::UInt8 limitTime)
{
	_gameIndex = gameIndex;
	_gameId = 0;
	_limitTime = limitTime;
	_player1 = NULL;
	_player2 = NULL;
	memset(_gameBoard, 0, 15 * 15);
}

Game::~Game()
{
	
}

PutInfo Game::getPutsBack()
{
	return _puts.back();
}

Poco::UInt64 Game::getStartTime()
{
	return _startTime;
}

void Game::startGame(Poco::Int32 gameId, User *player1, User *player2)
{
	_gameId = gameId;
	_player1 = player1;
	_player2 = player2;
	_player1->setGameIndex(_gameIndex);
	_player2->setGameIndex(_gameIndex);
	_currentPlayer = 1;
	_startTime = static_cast<Poco::UInt64>(std::time(NULL));
}

void Game::endGame()
{
	_gameId = 0;
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

bool Game::isValidPut(Poco::Int8 x, Poco::Int8 y)
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

bool Game::checkVictory()
{
	int cnt;
	int x;
	int y;
	int player;

	PutInfo putInfo = getPutsBack();
	x = putInfo.x;
	y = putInfo.y;
	player = putInfo.player;
	
	// 가로 방향
	cnt = 1;
	for (int i = x - 1; i >= 0 && _gameBoard[y][i] == player; --i) cnt++;
	for (int i = x + 1; i < Okmok::BOARD_SIZE && _gameBoard[y][i] == player; ++i) cnt++;
	if (cnt == Okmok::WIN_LENGTH) return true;

	// 세로 방향
	cnt = 1;
	for (int i = y - 1; i >= 0 && _gameBoard[i][x] == player; --i) cnt++;
	for (int i = y + 1; i < Okmok::BOARD_SIZE && _gameBoard[i][x] == player; ++i) cnt++;
	if (cnt == Okmok::WIN_LENGTH) return true;

	// 대각선 방향 (오른쪽 아래)
	cnt = 1;
	for (int i = 1; y - i >= 0 && x - i >= 0 && _gameBoard[y - i][x - i] == player; ++i) cnt++;
	for (int i = 1; y + i < Okmok::BOARD_SIZE && x + i < Okmok::BOARD_SIZE && _gameBoard[y + i][x + i] == player; ++i) cnt++;
	if (cnt == Okmok::WIN_LENGTH) return true;

	// 대각선 방향 (오른쪽 위)
	cnt = 1;
	for (int i = 1; y - i >= 0 && x + i < Okmok::BOARD_SIZE && _gameBoard[y - i][x + i] == player; ++i) cnt++;
	for (int i = 1; y + i < Okmok::BOARD_SIZE && x - i >= 0 && _gameBoard[y + i][x - i] == player; ++i) cnt++;
	if (cnt == Okmok::WIN_LENGTH) return true;
	
	return false;
}
