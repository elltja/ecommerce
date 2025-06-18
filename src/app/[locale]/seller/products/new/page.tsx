import { ProductFormClientWrapper } from './_client';

export default function NewProductPage() {
  return (
    <div className='p-10'>
      <div className='mb-5'>
        <h1 className='text-lg font-semibold'>Add Product</h1>
        <p className='mt-2 text-sm/6 text-gray-600'>Add a new product.</p>
      </div>
      <ProductFormClientWrapper />
    </div>
  );
}
