import { DefaultTheme } from 'styled-components';

const sizes = {
  mobile: '768px',
  desktop: '1024px',
};

const device = {
  mobile: `(max-width: ${sizes.mobile})`,
  desktop: `(min-width: ${sizes.mobile + 1})`,
};

const colors = {
  black: '#000000',
  white: '#ffffff',
  green: '#00ff00',
  red: '#ff0000',
  fucia: '#ff00ff',
  orange: '#ffa500',
  yellow: '#ffff00',
  blue: '#0000ff',
  aqua: '#00ffff',
  gray: '#d9d9d9',
  darkgray: '#808080',
};

const fontsizes = {
  xxlarge: '3rem',
  xlarge: '2rem',
  large: '1.2rem',
  medium: '1rem',
  small: '0.8rem',
};

const radiuses = {
  big: '3rem',
  small: '0.6rem',
  mini: '0.3rem',
};

const thick = {
  bold: '4px',
  middle: '3px',
  thin: '2px',
};

const flexs = {
  center: `
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  centerColumn: `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  spaceBetween: `
	display: flex;
	justify-content: space-between;
	align-items: center;
`,
};

export const theme: DefaultTheme = {
  device,
  colors,
  fontsizes,
  radiuses,
  thick,
  flexs,
};
