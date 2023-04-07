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
  giant: '2.1rem',
  big: '1.2rem',
  medium: '1rem',
  small: '0.8rem',
};

const radiuses = {
  big: '1rem',
  small: '0.6rem',
  mini: '0.3rem',
};

const commons = {
  flexCenter: `
    display: flex;
    justify-contents: center;
    align-items: center;
  `,
  flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
  `,
};

export const theme: DefaultTheme = {
  device,
  colors,
  fontsizes,
  radiuses,
  commons,
};
