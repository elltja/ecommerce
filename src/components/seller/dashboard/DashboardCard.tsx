import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from '~/i18n/navigation';

export function DashboardCard({
  children,
  title,
  link,
  Icon,
}: {
  children: ReactNode;
  title: string;
  link: { href: string; text: string };
  Icon: LucideIcon;
}) {
  return (
    <div className='flex h-fit w-full gap-5 rounded bg-white p-7 pt-10 shadow'>
      <div className='py-1'>
        <Icon />
      </div>
      <div className='flex flex-col gap-5'>
        <h2 className='text-lg font-semibold'>{title}</h2>
        {children}
        <Link
          href={link.href}
          className='flex items-center gap-2 text-blue-400 hover:underline'
        >
          {link.text}
        </Link>
      </div>
    </div>
  );
}
