#pragma once

#include "PacketID.hpp"
#include "PacketErrorCode.hpp"

#include <Poco/Types.h>

/**
 * @brief 클라이언트의 요청 패킷입니다.
 */
struct RecvPacketInfo
{
	int sessionIndex = 0; ///< SessionID입니다.
	Poco::UInt16 packetID = 0;
	Poco::UInt16 packetBodySize = 0;
	char* pBodyData = 0;
};


#pragma pack(push, 1)
struct PACKET_HEADER
{
	Poco::UInt16 packetSize = 0;
	Poco::UInt16 packetID = 0;
	Poco::UInt8 type = 1; //압축여부 암호화여부 등 속성을 알아내는 값
};

struct LOGIN_RESPONSE_PACKET : public PACKET_HEADER
{
	Poco::Int64 userId;
};

struct ROOM
{
	Poco::Int32 roomNumber;
	Poco::UInt8 limitTime;
	Poco::UInt8 isFull;
	Poco::UInt64 player1;
	Poco::UInt64 player2;
};

struct ROOM_MAIN_RESPONSE_PACKET : public PACKET_HEADER
{
	Poco::UInt8 roomCount = 0; 
	struct ROOM rooms[10] = {0, };
};

struct R_ROOM_LIST_RESPONSE_PACKET : public ROOM_MAIN_RESPONSE_PACKET
{

};

struct ROOM_CREATE_RESPONSE_PACKET : public PACKET_HEADER
{
	
};

struct ROOM_ENTER_RESPONSE_PACKET : public PACKET_HEADER
{

};

struct ROOM_ENTER_REQUEST_PACKET
{
	Poco::Int32 roomNumber;
};

struct ROOM_INFO
{
	Poco::Int32 roomNumber;
	Poco::UInt8 limitTime;
	Poco::UInt64 player1;
	Poco::UInt64 player2;
};

struct ROOM_INFO_RESPONSE_PACKET : public PACKET_HEADER
{
	struct ROOM_INFO roomInfo;
};

struct R_ROOM_INFO_RESPONSE_PACKET : public PACKET_HEADER
{
	struct ROOM_INFO roomInfo;
};

struct ROOM_EXIT_RESPONSE_PACKET : public PACKET_HEADER
{
	
};

struct ROOM_KICKOUT_RESPONSE_PACKET : public PACKET_HEADER
{
	
};

struct R_ROOM_EXIT_RESPONSE_PACKET : public PACKET_HEADER
{
	
};

struct GAME_PUT_RESPONSE_PACKET : public PACKET_HEADER 
{

};

struct GAME_PUT_REQUEST_PACKET
{
	Poco::Int8 x;
	Poco::Int8 y;
	Poco::UInt64 time;
};

struct R_GAME_PUT_RESPONSE_PACKET : public PACKET_HEADER 
{
	Poco::Int8 result;
	Poco::Int8 x;
	Poco::Int8 y;
	Poco::Int8 player;
	Poco::UInt64 time;
};

struct R_GAME_RESULT_RESPONSE_PACKET : public PACKET_HEADER 
{
	Poco::Int8 result;
};

#pragma pack(pop)
