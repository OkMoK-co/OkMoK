import styled from 'styled-components';
import { LayoutContainer } from '@/styles/common-style';
import Logo from './Logo';
import Footer from './Footer';

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <Container>
      <LogoTitleWrap>
        <Logo size={'big'} />
      </LogoTitleWrap>
      {children}
      <Footer />
    </Container>
  );
}

const Container = styled(LayoutContainer)``;

const LogoTitleWrap = styled.div`
  margin-top: 8rem;
  height: 15rem;
  @media (${({ theme: { device } }) => device.mobile}) {
    margin-top: 6.6rem;
    height: 5rem;
  }
`;
