import { Moon, ShoppingCartIcon, User } from 'lucide-react';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import Link from 'next/link';
import { LanguageSelector } from './LanguageSelector';

export function Topbar() {
  return (
    <header className='bg-bg w-full shadow-sm'>
      <div className='flex items-center justify-between px-6 py-5 lg:px-24'>
        <div className='flex items-center gap-4'>
          <Logo />
        </div>
        <div className='flex items-center gap-4'>
          <Moon
            className='hover:text-primary size-5 cursor-pointer transition-colors'
            aria-label='Toggle dark mode'
          />
          <LanguageSelector />
          <Link href='#' passHref className='hover:text-primary'>
            <User />
          </Link>
          <Cart quantity={1} />
          <MobileMenu className='hover:text-primary' />
        </div>
      </div>
    </header>
  );
}

function Cart({ quantity }: { quantity: number }) {
  return (
    <Link
      href='/cart'
      passHref
      className='hover:text-primary relative flex items-center transition-colors'
      aria-label='View cart'
    >
      <ShoppingCartIcon className='size-5' />

      {quantity > 0 && (
        <span className='absolute -top-1 -right-2 rounded-full bg-red-500 px-1 text-xs text-white'>
          {quantity}
        </span>
      )}
    </Link>
  );
}
