'use client';

import {
  Button,
  Description,
  Field,
  Input,
  Label,
  Textarea,
} from '@headlessui/react';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Form from 'next/form';
import { useProductForm } from './ProductForm.hooks';
import type { InitialData } from './ProductForm.types';

export function ProductForm({
  initialData,
  onSubmitted,
}: {
  initialData?: InitialData;
  onSubmitted?: () => void;
}) {
  const { onSubmit, imagePreviews, handleImageChange, errors } = useProductForm(
    initialData,
    onSubmitted,
  );

  return (
    <Form action={onSubmit}>
      <div className='flex'>
        <div className='flex flex-1 flex-col gap-10'>
          <div>
            <div className='flex gap-7'>
              {[0, 1, 2, 3].map((index) => (
                <ImageUploader
                  key={index}
                  index={index}
                  preview={imagePreviews[index]}
                  onImageChange={handleImageChange}
                />
              ))}
            </div>
            {errors.images && <p className=''>{errors.images}</p>}
          </div>

          <Field className='flex flex-col gap-2'>
            <Label className='leading-2 font-semibold'>Title</Label>
            <Description className='text-sm/6 text-gray-600'>
              Name of the product
            </Description>
            <Input
              name='title'
              placeholder='Title'
              className='rounded-sm border border-gray-300 px-4 py-2 outline-none'
              defaultValue={initialData?.title ?? ''}
            />
            {errors.title && <p className='text-red-500'>{errors.title}</p>}
          </Field>

          <Field className='flex flex-col gap-2'>
            <Label className='leading-2 font-semibold'>Slug</Label>
            <Description className='text-sm/6 text-gray-700'>
              URL slug for the product (cannot contain &quot;/&quot; or spaces)
            </Description>
            <Input
              name='slug'
              placeholder='product-slug-here'
              className='rounded-sm border border-gray-300 px-4 py-2 outline-none'
              defaultValue={initialData?.slug ?? ''}
            />
            {errors.slug && <p className='text-red-500'>{errors.slug}</p>}
          </Field>

          <Field className='flex flex-col gap-2'>
            <Label className='leading-2 font-semibold'>Price</Label>
            <Description className='text-sm/6 text-gray-700'>
              Price in dollars
            </Description>
            <Input
              type='number'
              name='priceInDollars'
              placeholder='$00.00'
              className='rounded-sm border border-gray-300 px-4 py-2 outline-none'
              defaultValue={initialData?.priceInDollars ?? ''}
            />
            {errors.priceInDollars && (
              <p className='text-red-500'>{errors.priceInDollars}</p>
            )}
          </Field>
          <Field className='flex flex-col gap-2'>
            <Label className='leading-2 font-semibold'>Description</Label>
            <Description className='text-sm/6 text-gray-700'>
              Product description
            </Description>
            <Textarea
              name='description'
              placeholder='Description'
              className='field-sizing-content h-fit max-h-64 min-h-22 flex-1 resize-none rounded-sm border border-gray-300 px-4 py-2 outline-none'
              defaultValue={initialData?.description ?? ''}
            />
            {errors.description && (
              <p className='text-red-500'>{errors.description}</p>
            )}
          </Field>
        </div>
      </div>

      <div className='mt-4 w-full'>
        <Button
          type='submit'
          className='bg-primary hover:bg-primary-hover text-bg ml-auto cursor-pointer rounded-full px-8 py-2'
        >
          Submit
        </Button>
      </div>
    </Form>
  );
}

function ImageUploader({
  index,
  preview,
  onImageChange,
}: {
  index: number;
  preview: string | null | undefined;
  onImageChange: (index: number, file: File) => void;
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(index, file);
    }
  };

  return (
    <label className='cursor-pointer'>
      <div
        className={
          'relative flex size-35 items-center justify-center bg-gray-200'
        }
      >
        {preview ? (
          <Image
            src={preview}
            alt={`Preview ${index}`}
            className='h-20 w-20 rounded-sm object-cover'
            fill
          />
        ) : (
          <ImageIcon className='size-10 text-gray-400' />
        )}
      </div>
      <input type='file' hidden accept='image/*' onChange={handleFileChange} />
    </label>
  );
}
