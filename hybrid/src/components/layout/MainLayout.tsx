'use client';

import dynamic from 'next/dynamic';
import { isMobile } from 'react-device-detect';

const AdaptiveLayout = dynamic(
  () => (isMobile ? import('./MobileLayout') : import('./DesktopLayout')),
  { ssr: false }
);

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return <AdaptiveLayout>{children}</AdaptiveLayout>;
}
