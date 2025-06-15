import { Button } from '@headlessui/react';
import { ArrowRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function Hero() {
  return (
    <section className='flex flex-col lg:flex-row'>
      <HeroImage />
      <HeroContent />
    </section>
  );
}

function HeroImage() {
  return (
    <div className='relative h-64 lg:h-auto lg:flex-1'>
      <Image
        src='/test-images/flexible_img_2x_15331e25-75fc-49ec-9a70-8d17f78bcc33.webp'
        alt='Hero image'
        fill
        className='object-cover'
        priority
      />
    </div>
  );
}

function HeroContent() {
  const t = useTranslations();
  return (
    <div className='flex flex-1 items-center bg-white p-10'>
      <div className='flex flex-col items-center gap-6 sm:items-start lg:my-25'>
        <div>
          <p className='text-primary my-5 text-lg font-semibold lg:text-xl'>
            Presenting ECOM.
          </p>
          <h1 className='text-title-main w-full text-4xl font-medium lg:text-6xl'>
            {
              /* Lorem ipsum dolor sit amet consectetur adipisicing elit. */
              t('homePage.title')
            }
          </h1>
        </div>
        <p className='text-md text-[#23302b] sm:w-8/12 md:text-lg lg:w-10/12 lg:text-xl'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          pariatur consequuntur voluptate quasi ea accusamus fugiat voluptatibus
          architecto consectetur
        </p>
        <CTAButton />
      </div>
    </div>
  );
}

function CTAButton() {
  return (
    <Button className='bg-primary hover:bg-primary-hover my-7 flex w-fit cursor-pointer items-center gap-2 rounded-full px-10 py-3 font-semibold text-white transition-colors duration-300 lg:px-25'>
      SHOP AT 50% SALE
      <ArrowRightIcon className='size-5' />
    </Button>
  );
}
