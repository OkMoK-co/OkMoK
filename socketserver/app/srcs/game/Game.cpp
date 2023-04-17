#include "Game.hpp"

Game::Game(Poco::Int32 gameIndex)
{
	_gameIndex = gameIndex;
	_gameId = 0;
	_startTime = 0;
	_player1 = NULL;
	_player2 = NULL;
	_currentPlayer = 0;
	_currentStoneCount = 0;
	_gameTimer.init(gameIndex);
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

Poco::UInt8 Game::getCurrentPlayer()
{
	return _currentPlayer;
}

Poco::UInt32 Game::getCurrentTurn()
{
	return _puts.size();
}
Poco::UInt8 Game::takePlayerByUser(User *user)
{
	if (_player1 == user)
	{
		return 1;
	}
	else
	{
		return 2;
	}
}

User*   Game::takeRivalUserByUser(User *user)
{
	if (_player1 == user)
	{
		return _player2;
	}
	else
	{
		return _player1;
	}
}

Poco::UInt64 Game::takeCurrentTime()
{
	auto now = std::chrono::time_point_cast<std::chrono::milliseconds>(std::chrono::system_clock::now());
	return now.time_since_epoch().count();
}

void Game::startGame(Poco::Int32 gameId, User *player1, User *player2)
{
	_gameId = gameId;
	_player1 = player1;
	_player2 = player2;
	_player1->setGameIndex(_gameIndex);
	_player2->setGameIndex(_gameIndex);
	_currentStoneCount = 0;
	_currentPlayer = 1;
	_startTime = takeCurrentTime();
	_gameTimer.start();
}

void Game::endGame()
{
	_gameTimer.cancel();
	_gameId = 0;
	_startTime = 0;
	_player1->setGameIndex(-1);
	_player2->setGameIndex(-1);
	_player1->unReady();
	_player2->unReady();
	_player1 = NULL;
	_player2 = NULL;
	_currentPlayer = 0;
	_currentStoneCount = 0;
	_puts.clear();
	memset(_gameBoard, 0, 15 * 15);
}

void Game::addPut(Poco::Int8 x, Poco::Int8 y)
{
	Poco::UInt64 currentTime = takeCurrentTime();
	struct PutInfo put = {x, y, _currentPlayer, currentTime};
	_puts.push_back(put);
	_gameBoard[y][x] = _currentPlayer;
	_currentPlayer = 3 - _currentPlayer;
	_currentStoneCount += 1;
	_gameTimer.restart();
}

void Game::timeOver()
{
	Poco::UInt64 currentTime = takeCurrentTime();
	struct PutInfo put = {-1, -1, _currentPlayer, currentTime};
	_puts.push_back(put);
	_currentPlayer = 3 - _currentPlayer;
	_gameTimer.restart();
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

bool Game::checkDraw()
{
	if (_currentStoneCount == Okmok::MAX_STONE_COUNT)
	{
		return true;
	}
	else
	{
		return false;
	}
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
