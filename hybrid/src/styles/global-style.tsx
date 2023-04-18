import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;  
    box-sizing: border-box;
  }

	body {
		width: 100vw;
    height: 100vh;
		background-color: ${({ theme }) => theme.colors.black};
		color: ${({ theme }) => theme.colors.white};
	}

	button {
		all: unset;
		cursor:pointer
	}

	input {
		all: unset;
	}

	a {
  color: inherit;
  text-decoration: none;
	cursor: pointer;
	}

`;

export default GlobalStyle;
