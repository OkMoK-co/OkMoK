#pragma once

#include <vector>
#include <dispatch/dispatch.h>

#include "../../session/Session.hpp"
#include "../../util/PocoType.hpp"
#include "../Okmok.hpp"

struct TimeOutInfo
{
	Poco::Int32 gameIndex;
	Poco::Int32 gameCurrentTurn;
};

class GameTimer {
	public :
		GameTimer();
		~GameTimer();

		void init(Poco::Int32 gameIndex);

		void start();
		void restart();
		void cancel();

	private :
		static dispatch_queue_t _gameTimerQueue;
		dispatch_source_t _gameTimer;
		TimeOutInfo _timeOutInfo;
};
