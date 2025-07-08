import type { ReactNode } from 'react';

export default function OrderLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='flex w-full items-center justify-between px-10 py-4'>
        <div className='mt-5'>
          <h1 className='text-xl font-semibold'>Order details</h1>
        </div>
      </div>
      <div className='p-10'>{children}</div>
    </>
  );
}
