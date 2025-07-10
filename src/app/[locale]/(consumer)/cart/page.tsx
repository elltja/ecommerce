'use client';

import { Button } from '@headlessui/react';
import { ArrowRight } from 'lucide-react';
import Form from 'next/form';
import { useTransition } from 'react';
import { CartItem } from '~/components/cart/CartItem';
import { LoadingTextSwap } from '~/components/LoadingTextSwap';
import { env } from '~/env';
import { Link } from '~/i18n/navigation';
import { checkout as checkoutAction } from '~/server/actions/checkout';
import { useCartStore } from '~/store/cartStore';

export default function CartPage() {
  const { cart, totalPrice } = useCartStore();

  const [isPending, startTransition] = useTransition();

  function checkout(formData: unknown) {
    startTransition(async () => {
      await checkoutAction(formData);
    });
  }

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
                disabled={isPending}
              >
                <LoadingTextSwap isLoading={isPending}>
                  Checkout
                </LoadingTextSwap>
              </Button>
            </Form>
          </div>
          <p className='font-semibold'>Total: {totalPrice}</p>
        </div>
      </div>
    </div>
  );
}
