import { Button } from '@headlessui/react';
import { ArrowRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { env } from '~/env';
import { Link } from '~/i18n/navigation';

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
  const t = useTranslations('homePage.hero');
  return (
    <div className='flex flex-1 items-center bg-white p-10'>
      <div className='flex flex-col items-center gap-6 sm:items-start lg:my-25'>
        <div>
          <p className='text-primary my-5 text-lg font-semibold lg:text-xl'>
            {t('subtitle')}
          </p>
          <h1 className='text-title w-full text-4xl font-medium lg:text-6xl'>
            {t('title')}
          </h1>
        </div>
        <p className='text-md text-[#23302b] sm:w-8/12 md:text-lg lg:w-10/12 lg:text-xl'>
          {t('description')}
        </p>
        <CTAButton />
      </div>
    </div>
  );
}

function CTAButton() {
  const t = useTranslations('homePage.hero');
  return (
    <Link href={`/products/${env.MAIN_PRODUCT_SLUG}`} passHref>
      <Button className='bg-primary hover:bg-primary-hover my-7 flex w-fit cursor-pointer items-center gap-2 rounded-full px-10 py-3 font-semibold text-white transition-colors duration-300 lg:px-25'>
        {t('CTA')}
        <ArrowRightIcon className='size-5' />
      </Button>
    </Link>
  );
}
