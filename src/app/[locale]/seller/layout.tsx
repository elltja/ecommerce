import { redirect } from '~/i18n/navigation';
import type { ReactNode } from 'react';
import { canAccessSellerPages } from '~/permissions/seller';
import { auth } from '~/server/auth';
import { getLocale } from 'next-intl/server';

export default async function SellerLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  const locale = await getLocale();
  if (!canAccessSellerPages({ role: session?.user.role })) {
    redirect({ href: '/', locale });
  }
  return (
    <>
      <main>{children}</main>
    </>
  );
}
