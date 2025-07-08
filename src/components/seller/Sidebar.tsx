'use client';

import type { UserRole } from '@prisma/client';
import { Box, LayoutDashboard, List, User } from 'lucide-react';
import { Link, usePathname } from '~/i18n/navigation';
import { canAccessUserList } from '~/permissions/user';

export function SideBar({ userRole }: { userRole?: UserRole }) {
  const navItems = getNavItems(userRole);
  const pathname = usePathname();
  return (
    <aside className='flex h-screen w-[240px] flex-col border-r border-gray-300'>
      <nav
        className='flex h-screen w-[240px] flex-col border-r border-gray-300'
        aria-label='Primary Navigation'
      >
        {navItems.map(({ Icon, text, href }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={text}
              href={href}
              className={`flex w-full items-center gap-3 p-5 hover:bg-gray-200 ${isActive ? 'bg-gray-300 font-semibold' : ''} `}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon aria-hidden='true' focusable='false' />
              <span>{text}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

function getNavItems(userRole?: UserRole) {
  return [
    { text: 'Dashboard', Icon: LayoutDashboard, href: '/seller' },
    ...(canAccessUserList({ role: userRole })
      ? [{ text: 'Users', Icon: User, href: '/seller/users' }]
      : []),
    { text: 'Orders', Icon: List, href: '/seller/orders' },
    { text: 'Products', Icon: Box, href: '/seller/products' },
  ];
}
