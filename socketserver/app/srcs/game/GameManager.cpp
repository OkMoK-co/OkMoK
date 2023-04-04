#include "GameManager.hpp"

void GameManager::init(Poco::Int32 maxGameCount)
{
	_maxGameCount = maxGameCount;
	_currentGameId = 0;
	_gamePool = std::vector<Game *>(maxGameCount);
	for (int i = 0; i < maxGameCount; ++i)
	{
		_gamePool[i] = new Game(i, 30);
	}
}

void GameManager::createGame(Poco::Int32 gameIndex, User *player1, User *player2)
{
	_currentGameId += 1;
	_gamePool[gameIndex]->startGame(_currentGameId, player1, player2);
}

PACKET_ERROR_CODE GameManager::putOkmok(User* player, Poco::Int8 x, Poco::Int8 y, Poco::UInt64 time)
{
	Game *game;
	Poco::Int32 gameIndex = player->getGameIndex();

	if (gameIndex == -1)
	{
		return PACKET_ERROR_CODE::GAME_PUT_ERROR;
	}

	game = _gamePool[gameIndex];
	if (!game->isCurrentPlayer(player))
	{
		return PACKET_ERROR_CODE::GAME_PUT_ERROR;
	}

	if (!game->isValidPut(x, y))
	{
		return PACKET_ERROR_CODE::GAME_PUT_ERROR;
	}

	game->addPut(x, y, 0);

	return PACKET_ERROR_CODE::NONE;
}
