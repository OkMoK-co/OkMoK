#pragma once
#include <Poco/Types.h>

namespace Okmok
{
	const Poco::Int8 BOARD_SIZE = 15;
	const Poco::Int16 MAX_STONE_COUNT = (const Poco::Int16) (BOARD_SIZE * BOARD_SIZE);
	const Poco::Int8 WIN_LENGTH = 5;
	const Poco::Int8 LIMIT_TIME = 30;
}
