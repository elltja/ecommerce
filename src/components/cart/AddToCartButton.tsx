'use client';

import { Button } from '@headlessui/react';
import type { Product, ProductImage } from '@prisma/client';
import { ShoppingCartIcon } from 'lucide-react';
import { useCartStore } from '~/store/cartStore';
import { AddedToCartDialog } from './AddedToCartDialog';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function AddToCartButton({
  productData,
}: {
  productData: Product & { images: ProductImage[] };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const t = useTranslations('product');

  return (
    <>
      <Button
        onClick={() => {
          addToCart({ product: productData, quantity: 1 });
          setIsOpen(true);
        }}
        className='bg-primary hover:bg-primary-hover text-bg flex w-full cursor-pointer items-center justify-center gap-2 rounded-full py-3 text-lg font-semibold lg:max-w-2/3'
      >
        <ShoppingCartIcon className='text-bg' />
        {t('addToCart')}
      </Button>
      <AddedToCartDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
