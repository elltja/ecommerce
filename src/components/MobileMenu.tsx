import clsx from 'clsx';
import { MenuIcon } from 'lucide-react';

export function MobileMenu({ className }: { className?: string }) {
  return (
    <>
      <MenuIcon className={clsx('size-7 cursor-pointer', className)} />
    </>
  );
}
