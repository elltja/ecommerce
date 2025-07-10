import type { ReactNode } from 'react';
import { TopBanner } from '~/components/layouts/Banner';
import { Footer } from '~/components/layouts/Footer';
import { Topbar } from '~/components/layouts/Topbar';

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
