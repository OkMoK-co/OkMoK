/* todo: 메인, 랭크, 기보 레이아웃 @자배 */
import MainLayout from '@/components/layout/MainLayout';
interface MainLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: MainLayoutProps) {
  return <MainLayout>{children}</MainLayout>;
}
