import styled from 'styled-components';

export default function Header() {
  return (
    <Container>
      <h1>
        <span>O</span>
        <span>k</span>
        <span>M</span>
        <span>o</span>
        <span>K</span>
      </h1>
    </Container>
  );
}

const Container = styled.header`
  ${({ theme }) => theme.flexs.center};
  height: 5rem;
  margin: 1.5rem;
  h1 {
    font-size: ${({ theme }) => theme.fontsizes.xxlarge};
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
  }
  @media (${({ theme: { device } }) => device.mobile}) {
    height: 2.5rem;
    margin: 0.8rem;
    h1 {
      font-size: ${({ theme }) => theme.fontsizes.xlarge};
      span {
        margin: 0 0.1rem;
      }
    }
  }
`;
