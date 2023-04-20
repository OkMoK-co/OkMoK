#pragma once

#include <vector>

#include <stdlib.h>
#include <signal.h>
#include <time.h>

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
		struct sigaction _sigAction;
		struct sigevent _sigEvent;
		struct itimerspec _itimerspec;
		timer_t _timerId;

		TimeOutInfo _timeOutInfo;
};
