import Header from './Header';
import Footer from './Footer';
import ExitButton from '@/components/game/exitButton';

interface GameLayoutProps {
  children: React.ReactNode;
}

export default function GameLayout({ children }: GameLayoutProps) {
  return (
    <>
      <Header />
      <ExitButton />
      <main>{children}</main>
      <Footer />
    </>
  );
}
