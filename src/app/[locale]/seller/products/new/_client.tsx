'use client';

import { ProductForm } from '~/components/seller/ProductForm/ProductForm';
import { useRouter } from '~/i18n/navigation';

export function ProductFormClientWrapper() {
  const router = useRouter();
  return <ProductForm onSubmitted={() => router.push('/seller/products')} />;
}
