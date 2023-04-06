APP_PATH     = ./app
SCRIPTS_PATH = ./scripts
BUILD_PATH   = ${APP_PATH}/_build

APP = socketserver

all : build

build : check
	@cmake -B ${BUILD_PATH} ${APP_PATH}
	@make -C ${BUILD_PATH}

check :
	@${SCRIPTS_PATH}/check_install.sh

run :
	@${APP_PATH}/bin/${APP}

clean :
	@rm -rf ${BUILD_PATH}/*

fclean : clean
	@rm -rf ${APP_PATH}/bin/${APP}
	
re : fclean all

.PHONY : all run build check clean fclean re
