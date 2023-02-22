import Apollo from '@/components/provider/Apollo';
import '@/styles/_global.scss';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <head />
      <body>
        <Apollo>{children}</Apollo>
      </body>
    </html>
  );
}
