cmake_minimum_required(VERSION 3.5)

project(socketserver LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
# 소스 디렉토리 설정
set(CMAKE_CURRENT_SOURCE_DIR ${CMAKE_CURRENT_LIST_DIR}/srcs)
# 프로그램 반환 디렉토리 설정
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_CURRENT_LIST_DIR}/bin)

# 패키지 설정
find_package(Poco CONFIG REQUIRED Net XML Zip Data Util)

# 컴파일에 필요한 소스파일 설정
add_executable(socketserver
	${CMAKE_CURRENT_SOURCE_DIR}/main.cpp
	${CMAKE_CURRENT_SOURCE_DIR}/server/WebsocketServer.cpp
	${CMAKE_CURRENT_SOURCE_DIR}/packet/PacketManager.cpp
)

# 링커에 필요한 라이브러리 설정
target_link_libraries(socketserver PRIVATE Poco::Net Poco::XML Poco::Zip Poco::Data Poco::Util)
