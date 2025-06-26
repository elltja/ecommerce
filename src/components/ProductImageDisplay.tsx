'use client';

import { Button } from '@headlessui/react';
import type { ProductImage } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';

export function ProductImageDisplay({ images }: { images: ProductImage[] }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className='flex gap-5 p-5 lg:justify-center'>
      <div className='no-scrollbar hidden overflow-x-auto lg:block lg:h-[37vw] xl:h-[30vw]'>
        <div className='flex flex-col gap-y-5'>
          {images.map((img) => (
            <Button key={img.id}>
              <Image
                src={img.url}
                alt={img.altText ?? 'Product image'}
                height={100}
                width={100}
                onClick={() => setSelectedImage(img)}
                className={`cursor-pointer object-cover ${img.id === selectedImage?.id ? 'border border-black' : 'border-gray-600 hover:border'}`}
              />
            </Button>
          ))}
        </div>
      </div>
      <div className='aspect-square size-full bg-gray-200 p-10 lg:size-[37vw] xl:size-[30vw]'>
        <div className='relative size-full'>
          <Image
            fill
            src={selectedImage?.url ?? ''}
            alt={selectedImage?.altText ?? ''}
            className='object-cover'
          />
        </div>
      </div>
    </div>
  );
}
