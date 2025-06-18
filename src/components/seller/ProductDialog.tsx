'use client';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState, type ReactNode } from 'react';
import { ProductForm } from './ProductForm/ProductForm';
import { useRouter } from '~/i18n/navigation';
import type { InitialData } from './ProductForm/ProductForm.types';

export function ProductDialogTrigger({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData: InitialData;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        className='cursor-pointer rounded-full border border-gray-300 px-4 py-2 hover:bg-gray-200'
        onClick={() => setIsOpen(true)}
      >
        {children}
      </Button>
      <ProductDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialData={initialData}
      />
    </>
  );
}

function ProductDialog({
  isOpen,
  onClose,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData: InitialData;
}) {
  const router = useRouter();

  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-10 focus:outline-none'
      onClose={onClose}
    >
      <div className='fixed inset-0 z-10 w-screen'>
        <div className='flex min-h-full items-center justify-center bg-[#0000004d]'>
          <DialogPanel
            transition
            className='w-fit max-w-fit flex-1 rounded-xl bg-white p-6 px-10 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0'
          >
            <div className='mb-5'>
              <DialogTitle className='text-lg font-semibold'>
                Edit Product
              </DialogTitle>
              <p className='mt-2 text-sm/6 text-gray-600'>
                Edit product information
              </p>
            </div>
            <ProductForm
              initialData={initialData}
              onSubmitted={() => {
                onClose();
                router.refresh();
              }}
            />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
