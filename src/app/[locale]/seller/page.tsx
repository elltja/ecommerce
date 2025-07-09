import { getLocale } from 'next-intl/server';
import { MostOrderedProducts } from '~/components/seller/dashboard/MostOrderedProducts';
import { OrdersCard } from '~/components/seller/dashboard/OrdersCard';
import { UsersCard } from '~/components/seller/dashboard/UsersCard';
import { PageHeader } from '~/components/seller/PageHeader';
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
      <PageHeader
        title={
          session?.user.name
            ? `Welcome Back ${session?.user.name}!`
            : `Welcome Back!`
        }
      />
      <div className='pt-5Z flex flex-col gap-10 px-20'>
        <div className='mt-10 grid grid-cols-2 gap-20'>
          <OrdersCard />
          <UsersCard />
        </div>
        <MostOrderedProducts />
      </div>
    </>
  );
}
