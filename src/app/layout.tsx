import './globals.css';

import { type Metadata } from 'next';
import { Geist } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Ecom',
  description: '',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' className={`${geist.variable}`}>
      <body>{children}</body>
    </html>
  );
}
