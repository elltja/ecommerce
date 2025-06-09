import { Button } from '@headlessui/react';
import { ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';

export function Hero() {
  return (
    <section className='flex h-[65vh]'>
      <div className='relative flex-1 p-10'>
        <Image
          src='/test-images/flexible_img_2x_15331e25-75fc-49ec-9a70-8d17f78bcc33.webp'
          fill
          alt=''
          className='object-cover'
        />
      </div>
      <div className='flex flex-1 items-center p-10'>
        <div className='flex flex-col gap-6'>
          <div>
            <p className='my-5 text-xl font-semibold text-[#00db8b]'>
              Presenting ECOM.
            </p>
            <h1 className='w-full text-6xl font-medium text-[#586e66]'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h1>
          </div>
          <p className='text-md text- w-10/12 text-[#23302b] sm:w-8/12 md:text-lg lg:text-xl'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            pariatur consequuntur voluptate quasi ea accusamus fugiat
            voluptatibus architecto consectetur
          </p>
          <Button className='bg-primary hover:bg-primary-hover my-7 flex w-fit cursor-pointer items-center gap-2 rounded-full px-25 py-3 font-semibold text-white transition-colors duration-300'>
            SHOP AT 50% SALE
            <ArrowRightIcon className='size-5' />
          </Button>
        </div>
      </div>
    </section>
  );
}
