#pragma once
#include <unordered_map>
#include <functional>
#include "../room/RoomManager.hpp"
#include "../user/UserManager.hpp"

/**
 * @brief 패킷을 관리하는 매니저 클래스입니다.
 */
class PacketManager
{
	public:
		PacketManager() = default;
		~PacketManager() = default;

		void init(const int maxSessionCount);
		void process(Poco::Int32 connectionIndex, const Poco::UInt16 packetID, char* pBuf, Poco::Int16 bodySize);
		
		template <typename T>
		T makePacketHeader(Poco::UInt16 packetID);
		
		template <typename T>
		void makeMainRooms(T &packet);
		void broadcastMainRooms();
		
		void processDevEcho(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize);
		void processLogin(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize);
		
		void processEnterMain(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize);
		void processCreateRoom(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize);
		void processEnterRoom(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize);
		void processInfoRoom(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize);
		void processExitRoom(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize);

		void processPutGame(Poco::Int32 connIndex, char* pBodyData, Poco::Int16 bodySize);

		std::function<void(const int, const char*, const int)> sendPacketFunc;

	private:
		typedef void(PacketManager::* PROCESS_RECV_PACKET_FUNCTION)(Poco::Int32, char*, Poco::Int16);
		/**
		 * @brief 패킷 요청별 처리할 함수를 저장합나다.
		 */
		std::unordered_map<int, PROCESS_RECV_PACKET_FUNCTION> _recvFuntionDictionary;
		RoomManager _roomManager;
		UserManager _userManager;
};

