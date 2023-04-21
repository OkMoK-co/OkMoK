import styled from 'styled-components';

interface LogoProps {
  size?: string;
}

export default function Logo({ size }: LogoProps) {
  return (
    <Container size={size || 'normal'}>
      <span>O</span>
      <span>k</span>
      <span>M</span>
      <span>o</span>
      <span>K</span>
    </Container>
  );
}

const Container = styled.h1<{ size: string }>`
  font-size: ${({ size, theme }) =>
    theme.fontsizes[logoFontSize.desktop[size]]};
  span {
    margin: 0 0.2rem;
  }
  span:nth-child(1) {
    color: ${({ theme }) => theme.colors.red};
  }
  span:nth-child(2) {
    color: ${({ theme }) => theme.colors.green};
  }
  span:nth-child(3) {
    color: ${({ theme }) => theme.colors.blue};
  }
  span:nth-child(4) {
    color: ${({ theme }) => theme.colors.yellow};
  }
  span:nth-child(5) {
    color: ${({ theme }) => theme.colors.aqua};
  }
  @media (${({ theme: { device } }) => device.mobile}) {
    font-size: ${({ size, theme }) =>
      theme.fontsizes[logoFontSize.mobile[size]]};
    span {
      margin: 0 0.1rem;
    }
  }
`;

const logoFontSize: { [key: string]: { [key: string]: string } } = {
  desktop: {
    normal: `xxlarge`,
    big: `giantlarge`,
  },
  mobile: {
    normal: `xlarge`,
    big: `xxlarge`,
  },
};
