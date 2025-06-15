import { redirect } from '~/i18n/navigation';
import type { ReactNode } from 'react';
import { canAccessSellerPages } from '~/permissions/seller';
import { auth } from '~/server/auth';
import { getLocale } from 'next-intl/server';
import { SideBar } from '~/components/seller/Sidebar';
import { TopBar } from '~/components/seller/Topbar';

export default async function SellerLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (!canAccessSellerPages({ role: session?.user.role })) {
    redirect({
      href: '/',
      locale: await getLocale(),
    });
  }
  return (
    <div>
      <TopBar />
      <div className='flex'>
        <SideBar />
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  );
}
