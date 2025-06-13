import type { ReactNode } from 'react';

export default function SellerLayout({
  children,
  navbar,
}: {
  children: ReactNode;
  navbar: ReactNode;
}) {
  return (
    <>
      <aside>{navbar}</aside>
      <main>{children}</main>
    </>
  );
}
