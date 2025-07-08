import { getLocale } from 'next-intl/server';
import { OrdersCard } from '~/components/seller/dashboard/OrdersCard';
import { ProductsCard } from '~/components/seller/dashboard/ProductsCard';
import { UsersCard } from '~/components/seller/dashboard/UsersCard';
import { redirect } from '~/i18n/navigation';
import { auth } from '~/server/auth';

export default async function SellerPage() {
  const session = await auth();

  if (!session) {
    const locale = await getLocale();
    redirect({ href: '/', locale });
  }
  return (
    <>
      <div className='flex w-full items-center justify-between px-10 py-4'>
        <h1 className='mt-5 text-xl font-semibold'>
          {session?.user.name
            ? `Welcome Back ${session?.user.name}!`
            : `Welcome Back!`}
        </h1>
      </div>
      <div className='grid grid-cols-3 gap-20 px-20 py-10'>
        <OrdersCard />
        <UsersCard />
        <ProductsCard />
      </div>
    </>
  );
}
