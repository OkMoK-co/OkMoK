#pragma once

#include <Poco/Types.h>

/**
 * @brief 에러 응답코드를 정의하는 부분입니다.
 */
enum class PACKET_ERROR_CODE : short
{
	NONE = 0,
	GAME_ERROR = 1,
	ROOM_ERROR = 2,
};

enum class PACKET_OPTION : Poco::UInt8
{
	FAIL = 0,
	SUCCESS = 1,
};
