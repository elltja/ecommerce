import Image from 'next/image';
import { db } from '~/server/db';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return (
    <>
      <div>
        {product?.images.map((image) => (
          <Image
            key={image.id}
            src={image.url}
            alt={image.altText ?? product.title}
            height={50}
            width={50}
          />
        ))}
      </div>
      <h1>{product?.title}</h1>
    </>
  );
}

function getProduct(slug: string) {
  return db.product.findUnique({
    where: { slug },
    include: { images: { orderBy: { position: 'asc' } } },
  });
}
