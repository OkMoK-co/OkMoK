#!/bin/sh

# MacOS
if [[ "$(uname)" == "Darwin" ]]; then
	# Check install brew
	if command -v brew >/dev/null 2>&1; then
		echo "✅ Brew installed"
	else
		echo "Brew is not installed. Installing Brew..."
		/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
	fi

	if command -v cmake &> /dev/null 2>&1; then
		echo "✅ Cmake installed"
	else
		brew install cmake
	fi

	# Check install Poco_lib By MacOS
	if command brew list | grep poco >/dev/null 2>&1; then
		echo "✅ Poco library installed"
	else
		echo "Poco library is not installed. Installing Poco..."
		brew install poco
	fi
fi

# Linux
if [[ "$(uname)" == "Linux" ]]; then
	# Check install Poco_lib By Linux
	if command apk info | grep poco-dev >/dev/null 2>&1; then
		echo "✅ Poco library installed"
	else
		echo "Poco library is not installed. Installing Poco..."
		apk add poco-dev
	fi

	if command -v cmake &> /dev/null 2>&1; then
		echo "✅ Cmake installed"
	else
		echo "Cmake is not installed. Installing Cmake..."
		apk add cmake
	fi
fi

if ! [ "$(uname)" == "Darwin" ] && ! [ "$(uname)" == "Linux" ]; then
	echo "Unsupported OS"
	exit 1
fi
