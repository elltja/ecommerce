import type { ReactNode } from 'react';
import { PageHeader } from '~/components/seller/PageHeader';

export default function OrderLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageHeader title='Order details' />
      <div className='p-10'>{children}</div>
    </>
  );
}
