/**
 * @file main.cpp
 * @date 2023-02-22
 * @author donghyuk
 * @brief 웹서버 클래스입니다.
 */

#include <deque>
#include <thread>
#include <mutex>
#include <optional>

#include <Poco/Net/SocketReactor.h>
#include <Poco/Net/ParallelSocketAcceptor.h>

#include "../packet/Packet.hpp"
#include "../packet/PacketManager.hpp"
#include "../session/Session.hpp"

#ifndef WEBSOCKETSERVER_HPP
#define WEBSOCKETSERVER_HPP

class WebSocketServer {
public:
	WebSocketServer() = default;
	~WebSocketServer() = default;

	void init(const int maxSessionCount);
	void start(const Poco::UInt16 port);
	void run();


private:
	void SetFunction();

	/* session */
	void onConnect(Session* pSession);
	void onClose(Session* pSession);

	void registerSesssion(Session* pSession);
	void unRegisterSesssion(const int index);

	std::optional<int> allocSesionIndex();
	void freeSessionIndex(const int index);

	/* packet */
	void sendPacket(const int sessionIndex, const char* pData, const int size);
	void addPacketQueue(const bool bInternal, const Poco::Int32 sessionIndex, const short pktID, const short bodySize, char* pDataPos);
	RecvPacketInfo getPacketInfo();

	/* variable */
	Poco::Net::ServerSocket _serverSocket;
	Poco::Net::SocketReactor _reactor;
	std::unique_ptr<Poco::Net::ParallelSocketAcceptor<Session, Poco::Net::SocketReactor>> _pAcceptor = nullptr;

	bool _isRun = false;

	std::mutex _mutexPacketQueue;
	std::deque<RecvPacketInfo> _packetQueue;

	std::mutex _mutexSessionPool;
	std::deque<int> _sessionIndexPool;

	std::vector<Session*> _sessions;

	PacketManager _packetManager;
};

#endif
