#include "GameManager.hpp"

std::vector<Game *> GameManager::getGamePool()
{
	return _gamePool;
}

void GameManager::init(Poco::UInt32 maxGameCount)
{
	_maxGameCount = maxGameCount;
	_currentGameId = 0;
	_gamePool = std::vector<Game *>(maxGameCount);

	for (int i = 0; i < maxGameCount; ++i)
	{
		_gamePool[i] = new Game(i);
	}
}

void GameManager::createGame(Poco::Int32 roomIndex, User *player1, User *player2)
{
	_currentGameId += 1;
	_gamePool[roomIndex]->startGame(_currentGameId, player1, player2);
}

PACKET_ERROR_CODE GameManager::putOkmok(User* player, Poco::Int8 x, Poco::Int8 y, Poco::UInt64 time)
{
	Game *game;
	Poco::Int32 gameIndex = player->getGameIndex();

	if (gameIndex == -1)
	{
		return PACKET_ERROR_CODE::GAME_ERROR;
	}

	game = _gamePool[gameIndex];
	if (!game->isCurrentPlayer(player))
	{
		return PACKET_ERROR_CODE::GAME_ERROR;
	}

	if (!game->isValidPut(x, y))
	{
		return PACKET_ERROR_CODE::GAME_ERROR;
	}

	game->addPut(x, y);

	return PACKET_ERROR_CODE::NONE;
}

PACKET_ERROR_CODE GameManager::timeOutOkmok(TimeOutInfo *timeOutInfo)
{
	Game *game = takeGameByGameIndex(timeOutInfo->gameIndex);

	if (game->getCurrentTurn() != timeOutInfo->gameCurrentTurn)
	{
		return PACKET_ERROR_CODE::GAME_ERROR;
	}

	game->timeOver();

	return PACKET_ERROR_CODE::NONE;
}

Poco::Int8 GameManager::checkWinner(Poco::Int32 gameIndex)
{
	Poco::Int8 result = 0;
	Game *game = _gamePool[gameIndex];

	if (game->checkVictory())
	{
		result = game->getPutsBack().player;
		game->setGameWinner(result);
	}
	if (game->checkDraw())
	{
		result = 3;
		game->setGameWinner(result);
	}

	return result;
}

Game *GameManager::takeGameByGameIndex(Poco::Int32 gameIndex)
{
	return _gamePool[gameIndex];
}
