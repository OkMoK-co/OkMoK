#pragma once

#include <vector>
#include <list>
#include "User.hpp"
/**
 * @brief User를 관리하는 매니저 클래스입니다.
 */
class UserManager
{
	public:
		UserManager();
		~UserManager();

		std::list<User *> getMainUsers();

		void init(Poco::Int32 maxUserCount);
		User *takeUserByConnIndex(Poco::UInt32 connIndex);
		void addUser(Poco::UInt32 connIndex);
		void deleteUser(User *user);
		void addMainUsers(User *user);
		void deleteMainUsers(User *user);

	private:
		std::vector<User*> _userPool;
		std::list<User*> _mainUsers;
		Poco::UInt32 _maxUserCount;
		Poco::UInt32 _currentUserCount;
};

