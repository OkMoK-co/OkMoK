import styled from 'styled-components';
import Logo from './Logo';

interface HeaderProps {
  children?: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <Container>
      <Logo />
      {children}
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
