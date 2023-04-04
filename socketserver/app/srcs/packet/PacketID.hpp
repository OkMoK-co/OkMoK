#pragma once

/**
 * @brief 패킷 ID를 정의하는 부분입니다.
 */
enum class PACKET_ID : unsigned short
{
	INTERNAL_BEGIN = 101,
	INTERNAL_CLOSE = 107,
	INTERNAL_END = 150,

	DEV_ECHO = 181,

	LOGIN_REQUEST = 768,
	LOGIN_RESPONSE = 896,

	ROOM_MAIN_REQUEST = 256,
	ROOM_MAIN_RESPONSE = 384,
	
	ROOM_CREATE_REQUEST = 257,
	ROOM_CREATE_RESPONSE = 385,

	ROOM_ENTER_REQUEST = 258,
	ROOM_ENTER_RESPONSE = 386,

	ROOM_INFO_REQUEST = 259,
	ROOM_INFO_RESPONSE = 387,

	ROOM_EXIT_REQUEST = 260,
	ROOM_EXIT_RESPONSE = 388,

	ROOM_KICKOUT_REQUEST = 261,
	ROOM_KICKOUT_RESPONSE = 389,

	ROOM_SEARCH_REQUEST = 262,
	ROOM_SEARCH_RESPONSE = 390,

	ROOM_READY_REQUEST = 263,
	ROOM_READY_RESPONSE = 391,

	R_ROOM_LIST_RESPONSE = 33152,
	R_ROOM_INFO_RESPONSE = 33155,
	R_ROOM_EXIT_RESPONSE = 33156,

	GAME_PUT_REQUEST = 513,
	GAME_PUT_RESPONSE = 641,

	GAME_GIVEUP_REQUEST = 516,
	GAME_GIVEUP_RESPONSE = 644,

	R_GAME_START_RESPONSE = 33408,
	R_GAME_PUT_RESPONSE = 33409,
	R_GAME_RESULT_RESPONSE = 33411,
};
