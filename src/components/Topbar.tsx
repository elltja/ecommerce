import { ShoppingCartIcon, User } from 'lucide-react';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { Link } from '~/i18n/navigation';
import { LanguageSelector } from './LanguageSelector';
import { auth } from '~/server/auth';
import { canAccessSellerPages } from '~/permissions/seller';
import { Button } from '@headlessui/react';

export function Topbar() {
  return (
    <header className='bg-bg flex w-full items-center justify-between px-6 py-5 shadow-sm lg:px-24'>
      <Logo />
      <Actions />
    </header>
  );
}

async function Actions() {
  const session = await auth();
  const hasSellerAccess = canAccessSellerPages({ role: session?.user.role });
  return (
    <div className='flex items-center gap-4'>
      <div className='invisible flex items-center gap-4 md:visible'>
        {hasSellerAccess && (
          <Link passHref href='/seller'>
            <Button className='bg-primary hover:bg-primary-hover text-bg cursor-pointer rounded-full px-5 py-1'>
              Seller dashboard
            </Button>
          </Link>
        )}
        <LanguageSelector />
        <Link href='/account/auth' passHref className='hover:text-primary'>
          <User />
        </Link>
        <Cart quantity={1} />
      </div>
      <MobileMenu className='hover:tex t-primary md:invisible' />
    </div>
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
