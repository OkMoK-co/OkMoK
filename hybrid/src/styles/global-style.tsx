import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
		border: 0;
    box-sizing: border-box;
		font-size: 100%;
  }
	
	body {
		width: 100vw;
    height: 100vh;
		background-color: ${({ theme }) => theme.colors.black};
		color: ${({ theme }) => theme.colors.white};
		font-family: 'Aldrich', sans-serif;
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
