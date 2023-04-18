import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import ExitButton from '@/components/game/ExitButton';
import { LayoutContainer } from '@/styles/common-style';

interface GameLayoutProps {
  children: React.ReactNode;
}

export default function GameLayout({ children }: GameLayoutProps) {
  return (
    <>
      <Container>
        <Header />
        <ExitButton />
        <main>{children}</main>
        <Footer />
      </Container>
    </>
  );
}

const Container = styled(LayoutContainer)``;
