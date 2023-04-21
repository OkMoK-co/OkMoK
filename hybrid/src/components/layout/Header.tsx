import styled from 'styled-components';
import Logo from './Logo';

export default function Header() {
  return (
    <Container>
      <Logo />
    </Container>
  );
}

const Container = styled.header`
  ${({ theme }) => theme.flexs.center};
  height: 5rem;
  margin: 1.5rem;
  @media (${({ theme: { device } }) => device.mobile}) {
    height: 2.5rem;
    margin: 0.8rem;
  }
`;
