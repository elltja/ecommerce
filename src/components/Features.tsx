import Image from 'next/image';

export function Features() {
  return (
    <section className='bg-bg flex w-full flex-col shadow-sm lg:p-15 xl:flex-row'>
      <div className='flex flex-1 items-center p-10'>
        <div className='flex max-w-xl flex-col gap-6'>
          <h2 className='text-title mb-2 text-4xl font-bold'>
            Discover the Features
          </h2>
          <p className='text-lg leading-relaxed font-medium text-gray-700'>
            Explore the advanced features designed to enhance your experience.
            Our products combine innovation, quality, and performance to meet
            your needs.
          </p>
          <ul className='list-inside list-disc space-y-2 text-base font-semibold text-gray-800'>
            <li>High-precision sensors for accurate tracking</li>
            <li>Lightweight and comfortable design</li>
            <li>Long-lasting battery life</li>
            <li>Seamless Bluetooth connectivity</li>
            <li>Water-resistant for all-weather use</li>
          </ul>
        </div>
      </div>
      <div className='flex flex-1 items-center justify-center overflow-x-auto p-6 sm:p-10'>
        <div className='no-scrollbar flex w-full max-w-full flex-nowrap overflow-x-auto'>
          <ProductVariantImage src='/test-images/2.webp' />
          <ProductVariantImage src='/test-images/3.webp' />
          <ProductVariantImage src='/test-images/4.webp' />
        </div>
      </div>
    </section>
  );
}

function ProductVariantImage({ src }: { src: string }) {
  return (
    <div className='relative size-65 flex-shrink-0'>
      <Image src={src} alt='' fill className='object-contain' />
    </div>
  );
}
