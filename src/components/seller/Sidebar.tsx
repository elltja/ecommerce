import type { UserRole } from '@prisma/client';
import { Box, LayoutDashboard, List, User } from 'lucide-react';
import { Link } from '~/i18n/navigation';
import { canAccessUserList } from '~/permissions/users';

export function SideBar({ userRole }: { userRole?: UserRole }) {
  const navItems = getNavItems(userRole);
  return (
    <aside className='flex h-screen w-[240px] flex-col border-r border-gray-300'>
      {navItems.map(({ Icon, text, href }) => (
        <Link key={text} passHref href={href}>
          <div className='flex w-full cursor-pointer items-center gap-3 p-5 hover:bg-gray-200'>
            <Icon />
            {text}
          </div>
        </Link>
      ))}
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
