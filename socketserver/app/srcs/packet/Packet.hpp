#pragma once

#include "PacketID.hpp"
#include "PacketErrorCode.hpp"

#include <Poco/Types.h>

/**
 * @brief 클라이언트의 요청 패킷입니다.
 */
struct RecvPacketInfo
{
	int SessionIndex = 0; ///< SessionID입니다.
	Poco::UInt16 PacketID = 0;
	Poco::UInt16 PacketBodySize = 0;
	char* pBodyData = 0;
};


#pragma pack(push, 1)
struct PACKET_HEADER
{
	Poco::UInt16 PacketSize;
	Poco::UInt16 PacketID;
	Poco::UInt8 Type; //압축여부 암호화여부 등 속성을 알아내는 값
};

#pragma pack(pop)
