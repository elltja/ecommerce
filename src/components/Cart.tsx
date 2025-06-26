'use client';

import { ShoppingCartIcon } from 'lucide-react';
import { Link } from '~/i18n/navigation';
import { useCartStore } from '~/store/cartStore';

export function Cart() {
  const cart = useCartStore((state) => state.cart);

  const quantity = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <Link
      href='/cart'
      passHref
      className='hover:text-primary relative flex w-fit items-center transition-colors'
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
