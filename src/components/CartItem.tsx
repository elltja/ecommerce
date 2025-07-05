import { Button } from '@headlessui/react';
import Image from 'next/image';
import type { CartItem } from '~/lib/validators/cart';
import { useCartStore } from '~/store/cartStore';

export function CartItem({ product, quantity }: CartItem) {
  const { addToCart, removeFromCart } = useCartStore();
  const image = product.images[0];
  return (
    <li className='flex justify-between border-b border-gray-300 p-7'>
      <div className='flex gap-5'>
        <div>
          <Image
            src={image?.url ?? ''}
            alt={image?.altText ?? product.title}
            width={100}
            height={100}
            className='object-cover'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <h2>{product.title}</h2>
          <div className='flex items-center gap-2'>
            <Button
              onClick={() => addToCart({ product, quantity: 1 })}
              className='cursor-pointer rounded-sm border border-gray-300 px-2 py-1 hover:bg-gray-200'
            >
              +
            </Button>
            <span>{quantity}</span>
            <Button
              onClick={() => removeFromCart(product.id)}
              className='cursor-pointer rounded-sm border border-gray-300 px-2 py-1 hover:bg-gray-200'
            >
              -
            </Button>
          </div>
        </div>
      </div>
      <div>
        <p className='font-semibold'>${product.priceInCents / 100}</p>
      </div>
    </li>
  );
}
