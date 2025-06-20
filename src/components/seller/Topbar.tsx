import { Button } from '@headlessui/react';
import { Logo } from '../Logo';

export function TopBar() {
  return (
    <header className='bg-bg flex w-full items-center justify-between px-6 py-5 shadow-sm lg:px-24'>
      <div className='flex items-center gap-4'>
        <Logo />
        <div className='bg-primary text-bg rounded-full px-5 py-1'>Seller</div>
      </div>
      <Button className='cursor-pointer rounded-full border border-gray-300 px-4 py-2 hover:bg-gray-200'>
        Sign out
      </Button>
    </header>
  );
}
