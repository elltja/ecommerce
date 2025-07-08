import { Box } from 'lucide-react';
import { DashboardCard } from './DashboardCard';
import { db } from '~/server/db';
import Image from 'next/image';
import { Link } from '~/i18n/navigation';

export async function ProductsCard() {
  const [products, productsCount] = await Promise.all([
    db.product.findMany({
      select: { images: { select: { url: true, altText: true } }, slug: true },
      take: 5,
    }),
    db.product.count(),
  ]);
  return (
    <DashboardCard
      title={` ${productsCount} products`}
      link={{ href: '/seller/products', text: 'View all products' }}
      Icon={Box}
    >
      <div className='flex gap-5'>
        {products.map((product) => (
          <Link href={`/products/${product.slug}`} key={product.slug}>
            <Image
              src={product.images[0]?.url ?? ''}
              alt={product.images[0]?.altText ?? ''}
              height={35}
              width={35}
              className='cursor-pointer'
            />
          </Link>
        ))}
      </div>
    </DashboardCard>
  );
}
