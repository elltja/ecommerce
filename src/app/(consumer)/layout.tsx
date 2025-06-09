import type { ReactNode } from 'react';
import { TopBanner } from '~/components/Banner';
import { Topbar } from '~/components/Topbar';

export default function ConsumerLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <TopBanner />
      <Topbar />
      {children}
    </>
  );
}
