import Header from './Header';
import Footer from './Footer';
import MobileNav from './MobileNav';
import MobileChat from './MobileChat';

interface MobileLayoutProps {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <>
      <MobileNav />
      <Header />
      <MobileChat />
      {children}
      <Footer />
    </>
  );
}
