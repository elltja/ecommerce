import type { ReactNode } from 'react';
import { TopBanner } from '~/components/Banner';
import { Footer } from '~/components/Footer';
import { Topbar } from '~/components/Topbar';

export default async function ConsumerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <TopBanner />
      <Topbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
