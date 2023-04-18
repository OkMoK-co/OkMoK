import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';
import { LayoutContainer } from '@/styles/common-style';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Container>
      <Header />
      {children}
      <Footer />
    </Container>
  );
}

const Container = styled(LayoutContainer)``;
