import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { canAccessSellerPages } from '~/permissions/seller';
import { auth } from '~/server/auth';

export default async function SellerLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!canAccessSellerPages({ role: session?.user.role })) {
    redirect('/');
  }
  return (
    <>
      <main>{children}</main>
    </>
  );
}
