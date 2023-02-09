import Apollo from '@/components/provider/Apollo';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <head />
      <body>
        <div>
          <Apollo>{children}</Apollo>
        </div>
      </body>
    </html>
  );
}
