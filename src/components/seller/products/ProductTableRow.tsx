import type { Prisma } from '@prisma/client';
import Image from 'next/image';
import { ProductDialogTrigger } from './ProductDialog';
import { DeleteProductButton } from './DeleteProductButton';

export function ProductTableRow({
  product,
}: {
  product: Prisma.ProductGetPayload<{
    select: {
      id: true;
      title: true;
      description: true;
      priceInCents: true;
      slug: true;
      images: true;
    };
  }>;
}) {
  const priceInDollars = (product.priceInCents / 100).toFixed(2);
  return (
    <tr
      className='border-t border-gray-500/20'
      data-testid={`product-table-row-${product.id}`}
    >
      <td className='px-4 py-3 max-sm:hidden'>
        <div className='flex gap-3'>
          <Image
            src={product.images[0]?.url ?? '/test-images/2.webp'}
            alt=''
            width={50}
            height={50}
            className='aspect-square'
          />
          <div>
            <h3 className='font-semibold'>{product.title}</h3>
            <p className='text-sm text-gray-500' data-testid='product-slug'>
              {product.slug}
            </p>
          </div>
        </div>
      </td>
      <td className='px-4 py-3 max-sm:hidden'>${priceInDollars}</td>
      <td className='px-4 py-3 max-sm:hidden'>
        <div className='flex gap-2'>
          <ProductDialogTrigger
            initialData={{
              ...product,
              priceInDollars: parseInt(priceInDollars),
            }}
          >
            Edit
          </ProductDialogTrigger>
          <DeleteProductButton productId={product.id}>
            Delete
          </DeleteProductButton>
        </div>
      </td>
    </tr>
  );
}
