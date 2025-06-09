import '~/styles/globals.css';

import { type Metadata } from 'next';
import { Lato } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Ecom',
  description: '',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: '400',
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' className={`${lato.variable}`}>
      <body>{children}</body>
    </html>
  );
}
