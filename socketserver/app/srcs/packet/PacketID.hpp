#pragma once

/**
 * @brief 패킷 ID를 정의하는 부분입니다.
 */
enum class PACKET_ID : short
{
	INTERNAL_BEGIN = 101,
	INTERNAL_CLOSE = 107,
	INTERNAL_END = 150,

	DEV_ECHO = 181,
};

