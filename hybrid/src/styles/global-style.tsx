import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;  
    box-sizing: border-box;
  }
	body {
		background: ${({ theme }) => theme.colors.black};
		color: ${({ theme }) => theme.colors.white};
		${({ theme }) => theme.commons.flexCenter};
		
	}
	a {
  color: inherit;
  text-decoration: none;
}
`;

export default GlobalStyle;
