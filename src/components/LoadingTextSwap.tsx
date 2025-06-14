import clsx from 'clsx';
import { Loader2Icon } from 'lucide-react';
import type { ReactNode } from 'react';

export function LoadingTextSwap({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: ReactNode;
}) {
  return (
    <div className='grid items-center justify-items-center'>
      <div
        className={clsx(
          'col-start-1 col-end-2 row-start-1 row-end-2',
          isLoading ? 'invisible' : 'visible',
        )}
      >
        {children}
      </div>
      <div
        className={clsx(
          'col-start-1 col-end-2 row-start-1 row-end-2 text-center',
          isLoading ? 'visible' : 'invisible',
        )}
      >
        <Loader2Icon className='animate-spin' />
      </div>
    </div>
  );
}
