#include "GameTimer.hpp"

void gameTimerHandler(void* context);

dispatch_queue_t GameTimer::_gameTimerQueue = dispatch_queue_create(NULL, DISPATCH_QUEUE_CONCURRENT);


GameTimer::GameTimer()
{
}

GameTimer::~GameTimer()
{
}

void GameTimer::init(Poco::Int32 gameIndex)
{
	_timeOutInfo.gameIndex = gameIndex;
	_timeOutInfo.gameCurrentTurn = 0;
}

#include <iostream>
void GameTimer::start()
{
	_gameTimer = dispatch_source_create(DISPATCH_SOURCE_TYPE_TIMER, 0, 0, _gameTimerQueue);
	dispatch_set_context(_gameTimer, &_timeOutInfo);
	dispatch_source_set_event_handler_f(_gameTimer, &gameTimerHandler);
	dispatch_time_t newStartTime = dispatch_time(DISPATCH_TIME_NOW, Okmok::LIMIT_TIME * NSEC_PER_SEC);
	dispatch_source_set_timer(_gameTimer, newStartTime, Okmok::LIMIT_TIME * NSEC_PER_SEC, 0);
	dispatch_resume(_gameTimer);
}

void GameTimer::cancel()
{
	_timeOutInfo.gameCurrentTurn = 0;
	dispatch_source_cancel(_gameTimer);
}

void GameTimer::restart()
{
	_timeOutInfo.gameCurrentTurn += 1;
	dispatch_source_cancel(_gameTimer);
	start();
}

void gameTimerHandler(void* context)
{
	Session::_addPriorityPacketFunc(true, 0, PACKET_ID::INTERNAL_GAME_TIME_OUT, sizeof(TimeOutInfo), static_cast<char *>(context));
}
