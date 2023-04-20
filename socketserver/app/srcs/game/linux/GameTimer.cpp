#include "GameTimer.hpp"

void gameTimerHandler(int signum, siginfo_t *info, void *context);

GameTimer::GameTimer()
{
}

GameTimer::~GameTimer()
{
}

void GameTimer::init(Poco::Int32 gameIndex)
{
	memset(&_sigEvent, 0, sizeof(struct sigevent));

	_sigAction.sa_flags = SA_SIGINFO | SA_NODEFER;
	_sigAction.sa_sigaction = gameTimerHandler;
	sigemptyset(&_sigAction.sa_mask);

	_sigEvent.sigev_notify = SIGEV_SIGNAL;
	_sigEvent.sigev_signo = SIGALRM;
	_sigEvent.sigev_value.sival_ptr = &_timeOutInfo;

	_timeOutInfo.gameIndex = gameIndex;
	_timeOutInfo.gameCurrentTurn = 0;

	_itimerspec.it_value.tv_sec = Okmok::LIMIT_TIME;
	_itimerspec.it_value.tv_nsec = 0;
	_itimerspec.it_interval.tv_sec = 0;
	_itimerspec.it_interval.tv_nsec = 0;

	sigaction(SIGALRM, &_sigAction, NULL);
	if (timer_create(CLOCK_REALTIME, &_sigEvent, &_timerId) == -1)
	{
		perror("timer_create");
		exit(1);
	}
}

void GameTimer::start()
{
	_itimerspec.it_value.tv_sec = Okmok::LIMIT_TIME;
	timer_settime(_timerId, 0, &_itimerspec, NULL);
}

void GameTimer::cancel()
{
	_timeOutInfo.gameCurrentTurn = 0;
	_itimerspec.it_value.tv_sec = 0;
	timer_settime(_timerId, 0, &_itimerspec, NULL);
}

void GameTimer::restart()
{
	_timeOutInfo.gameCurrentTurn += 1;
	start();
}

void gameTimerHandler(int signum, siginfo_t *info, void *context)
{
	Session::_addPriorityPacketFunc(true, 0, PACKET_ID::INTERNAL_GAME_TIME_OUT, sizeof(TimeOutInfo), static_cast<char *>(info->si_value.sival_ptr));
}
