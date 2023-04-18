import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    device: { [key: string]: string };
    colors: { [key: string]: string };
    fontsizes: { [key: string]: string };
    radiuses: { [key: string]: string };
    thick: { [key: string]: string };
    flexs: { [key: string]: string };
  }
}
