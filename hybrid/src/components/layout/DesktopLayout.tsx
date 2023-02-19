import Header from './Header';
import Footer from './Footer';
import DesktopNav from './DesktopNav';
import DesktopChat from './DesktopChat';
import DesktopTaskBar from './DesktopTaskBar';

interface DesktopLayoutProps {
  children: React.ReactNode;
}

export default function DesktopLayout({ children }: DesktopLayoutProps) {
  return (
    <>
      <Header />
      <DesktopNav />
      <div>
        <div>
          {children}
          <Footer />
        </div>
        <DesktopChat />
      </div>
      <DesktopTaskBar />
    </>
  );
}
