import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import clsx from 'clsx';
import { MenuIcon, User } from 'lucide-react';
import { Link } from '~/i18n/navigation';
import { LanguageSelector } from './LanguageSelector';
import { Cart } from './Cart';

export function MobileMenu({ className }: { className?: string }) {
  return (
    <>
      <Popover>
        <PopoverButton>
          <MenuIcon className={clsx('size-7 cursor-pointer', className)} />
        </PopoverButton>
        <PopoverPanel anchor='bottom'>
          <Actions />
        </PopoverPanel>
      </Popover>
    </>
  );
}
function Actions() {
  return (
    <nav
      aria-label='Mobile menu actions'
      className='bg-bg flex flex-col gap-3 rounded-md p-4 shadow-md'
    >
      <div className='focus-within:ring-primary rounded-md focus-within:ring-2'>
        <LanguageSelector />
      </div>

      <Link
        href='/account/auth'
        passHref
        className='hover:bg-primary/10 hover:text-primary focus:ring-primary flex items-center gap-2 rounded-md py-3 text-gray-700 transition-colors focus:ring-2 focus:outline-none'
      >
        <User className='h-5 w-5' aria-hidden='true' />
        <span className='text-sm font-medium'>Account</span>
      </Link>

      <button
        type='button'
        aria-label='Open cart'
        className='hover:bg-primary/10 hover:text-primary focus:ring-primary flex items-center gap-2 rounded-md py-3 text-gray-700 transition-colors focus:ring-2 focus:outline-none'
      >
        <Cart />
        <span className='text-sm font-medium'>Cart</span>
      </button>
    </nav>
  );
}
