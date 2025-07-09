import type { ReactNode } from 'react';

export function PageHeader({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className='flex w-full items-center justify-between px-10 py-4'>
      <div className='mt-5'>
        <h1 className='text-xl font-semibold'>{title}</h1>
      </div>
      {children}
    </div>
  );
}
