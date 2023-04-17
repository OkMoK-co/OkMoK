#include "UserManager.hpp"

/**
 * @brief 패킷 ID별 처리할 함수를 등록합니다.
 * @param[in] maxSessionCount 서버가 최대 허용할 클라이언트의 수 입니다.
 */


UserManager::UserManager()
{

}

UserManager::~UserManager()
{

}

std::list<User *> UserManager::getMainUsers()
{
	return _mainUsers;
}

void UserManager::init(Poco::Int32 maxUserCount)
{
  _maxUserCount = maxUserCount;
	_currentUserCount = 0;
	_userPool = std::vector<User*>(_maxUserCount);

	for (int i = 0; i < _maxUserCount; i++) {
		_userPool[i] = new User();
		/* 로그인 */
		_userPool[i]->login(i);
	}
}

User *UserManager::takeUserByConnIndex(Poco::UInt32 connIndex)
{
	return _userPool[connIndex];
}


void UserManager::addUser(Poco::UInt32 connectIndex)
{
	_userPool[connectIndex]->login(connectIndex);
	++_currentUserCount;
}

void UserManager::deleteUser(User *user)
{
	user->logout();
	--_currentUserCount;
}

void UserManager::addMainUsers(User *user)
{
	_mainUsers.push_back(user);
}

void UserManager::deleteMainUsers(User *user)
{
	_mainUsers.remove(user);
}
