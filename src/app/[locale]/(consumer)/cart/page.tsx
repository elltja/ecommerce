'use client';

import { Button } from '@headlessui/react';
import { ArrowRight } from 'lucide-react';
import Form from 'next/form';
import Image from 'next/image';
import { env } from '~/env';
import { Link } from '~/i18n/navigation';
import { checkout } from '~/server/actions/checkout';
import { useCartStore, type CartItem } from '~/store/cartStore';

export default function CartPage() {
  const { cart, totalPrice } = useCartStore();

  if (cart.length < 1) {
    return (
      <div className='my-10 flex h-screen flex-col items-center gap-5'>
        <h1 className='text-center text-xl'>Your cart is empty </h1>
        <Link passHref href={`/products/${env.NEXT_PUBLIC_MAIN_PRODUCT_SLUG}`}>
          <Button className='bg-primary hover:bg-primary-hover text-bg flex w-fit cursor-pointer items-center gap-2 rounded-full px-4 py-2'>
            Shop now <ArrowRight className='size-5' />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='flex h-screen w-full flex-col'>
      <div className='mx-auto w-full md:w-5/6'>
        <ul className='w-full'>
          {cart.map((item) => (
            <CartItem key={item.product.id} {...item} />
          ))}
        </ul>

        <div className='flex w-full justify-between p-7'>
          <div>
            <Form action={checkout}>
              <input type='hidden' name='items' value={JSON.stringify(cart)} />
              <Button
                type='submit'
                className='bg-primary hover:bg-primary-hover text-bg cursor-pointer rounded-full px-25 py-2'
              >
                Checkout
              </Button>
            </Form>
          </div>
          <p className='font-semibold'>Total: {totalPrice}</p>
        </div>
      </div>
    </div>
  );
}

function CartItem({ product, quantity }: CartItem) {
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
