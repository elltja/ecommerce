import { redirect } from '~/i18n/navigation';
import type { ReactNode } from 'react';
import { canAccessSellerPages } from '~/permissions/general';
import { auth } from '~/server/auth';
import { getLocale } from 'next-intl/server';
import { SideBar } from '~/components/seller/layouts/Sidebar';
import { TopBar } from '~/components/seller/layouts/Topbar';

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
        <SideBar userRole={session?.user.role} />
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  );
}
