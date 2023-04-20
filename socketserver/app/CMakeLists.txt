cmake_minimum_required(VERSION 3.5)

project(socketserver LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 소스 디렉토리 설정
set(CMAKE_SOURCE_DIR ${CMAKE_CURRENT_LIST_DIR}/srcs)

# 프로그램 반환 디렉토리 설정
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_CURRENT_LIST_DIR}/bin)

# 패키지 설정
find_package(Poco CONFIG REQUIRED Net XML Zip Data Util)

# 모든 하위 디렉토리의 *.cpp 추가
file(GLOB_RECURSE SOURCE "${CMAKE_SOURCE_DIR}/*.cpp")

# 플랫폼 별 *.cpp 필터
if (UNIX AND NOT APPLE)
    list(FILTER SOURCE EXCLUDE REGEX ".*mac.*\\.cpp$")
elseif(APPLE)
    list(FILTER SOURCE EXCLUDE REGEX ".*linux.*\\.cpp$")
endif()

# 컴파일에 필요한 소스파일 설정
add_executable(socketserver ${SOURCE})

# 링커에 필요한 라이브러리 설정퍄
target_link_libraries(socketserver PRIVATE Poco::Net Poco::XML Poco::Zip Poco::Data Poco::Util)
