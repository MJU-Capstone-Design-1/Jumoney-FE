import type { Metadata } from 'next';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Jumoney',
  description: 'Jumoney Frontend Application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' className={cn('h-full', 'antialiased')}>
      <body className='min-h-full font-sans'>
        <div vaul-drawer-wrapper='' className='layout-wrapper'>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
