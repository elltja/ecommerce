import './globals.css';

import { type Metadata } from 'next';
import {
  // Figtree,
  // Fira_Sans,
  // Inter,
  // Lato,
  Mulish,
} from 'next/font/google';

// export const figtree = Figtree({
//   subsets: ['latin'],
//   variable: '--font-figtree',
//   weight: '400',
// });

// export const firaSans = Fira_Sans({
//   subsets: ['latin'],
//   variable: '--font-fira-sans',
//   weight: '400',
// });

// export const inter = Inter({
//   subsets: ['latin'],
//   variable: '--font-inter',
//   weight: '400',
// });

// export const lato = Lato({
//   subsets: ['latin'],
//   variable: '--font-lato',
//   weight: '400',
// });

export const mulish = Mulish({
  subsets: ['latin'],
  variable: '--font-mulish',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Ecom',
  description: '',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' className={`${mulish.variable}`}>
      <body>{children}</body>
    </html>
  );
}
