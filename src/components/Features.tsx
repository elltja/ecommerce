import Image from 'next/image';

export function Features() {
  return (
    <section className='bg-bg flex w-full p-25 shadow-sm'>
      <div className='flex flex-1 items-center p-10'>
        <div className='flex max-w-xl flex-col gap-6'>
          <h2 className='mb-2 text-4xl font-bold text-[#2e3835]'>
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
      <div className='flex flex-1 items-center justify-center p-10'>
        <ProductVariantImage src='/test-images/2.webp' />

        <ProductVariantImage src='/test-images/3.webp' />

        <ProductVariantImage src='/test-images/4.webp' />
      </div>
    </section>
  );
}

function ProductVariantImage({ src }: { src: string }) {
  return (
    <div className='relative size-80'>
      <Image src={src} alt='' fill />
    </div>
  );
}
