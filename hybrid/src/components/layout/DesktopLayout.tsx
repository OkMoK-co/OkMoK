import Header from './Header';
import Footer from './Footer';
import DesktopNav from './DesktopNav';
import DesktopChat from './DesktopChat';
import DesktopTaskBar from './DesktopTaskBar';
import styles from '@/styles/layout/DesktopLayout.module.scss';

interface DesktopLayoutProps {
  children: React.ReactNode;
}

export default function DesktopLayout({ children }: DesktopLayoutProps) {
  return (
    <div className={styles.desktop}>
      <Header />
      <div className={styles.navContainer}>
        <DesktopNav />
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.wrap}>
          <main>
            {children}
            <Footer />
          </main>
          <aside>
            <DesktopChat />
          </aside>
        </div>
      </div>
      <div className={styles.taskbarContainer}>
        <DesktopTaskBar />
      </div>
    </div>
  );
}
