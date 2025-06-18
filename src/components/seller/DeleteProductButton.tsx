'use client';

import { Button } from '@headlessui/react';
import { startTransition, type ReactNode } from 'react';
import { useRouter } from '~/i18n/navigation';
import { deleteProduct } from '~/server/actions/product';

export function DeleteProductButton({
  children,
  productId,
}: {
  children: ReactNode;
  productId: string;
}) {
  const router = useRouter();
  function performAction() {
    startTransition(async () => {
      await deleteProduct(productId);
      router.refresh();
    });
  }
  return (
    <Button
      className='cursor-pointer rounded-full border border-red-500 px-4 py-2 text-red-500 hover:bg-gray-200'
      onClick={performAction}
    >
      {children}
    </Button>
  );
}
