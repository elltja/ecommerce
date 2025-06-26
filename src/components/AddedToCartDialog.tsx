'use client';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { ArrowRight } from 'lucide-react';
import { Link } from '~/i18n/navigation';

export function AddedToCartDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-10 focus:outline-none'
      onClose={onClose}
    >
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center bg-[#0000004d]'>
          <DialogPanel
            transition
            className='w-fit rounded-xl bg-white px-5 py-7 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 sm:px-10'
          >
            <div className='lg:mr-25'>
              <div className='mb-5'>
                <DialogTitle className='text-lg font-semibold'>
                  Successfully added to cart
                </DialogTitle>
                <p className='mt-2 text-sm/6 text-gray-600'>
                  The product was added to the cart.
                </p>
              </div>
              <div className='flex gap-2'>
                <Button
                  onClick={onClose}
                  className='cursor-pointer rounded-full border border-gray-200 px-4 py-2 hover:bg-gray-100'
                >
                  Continue sopping
                </Button>
                <Link href='/cart' passHref>
                  <Button className='bg-primary hover:bg-primary-hover text-bg flex cursor-pointer items-center gap-2 rounded-full px-4 py-2'>
                    Go to cart <ArrowRight className='size-5' />
                  </Button>
                </Link>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
