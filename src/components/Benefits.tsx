import Image from 'next/image';

const BENEFITS = [
  {
    title: 'Fast Delivery',
    description:
      'Get your products delivered quickly and safely to your doorstep with our reliable shipping partners.',
    image: '/test-images/5.webp',
    imageAlt: 'Fast delivery illustration',
    reverse: false,
  },
  {
    title: 'Quality Assurance',
    description:
      'We ensure the highest quality standards for all our products, giving you peace of mind with every purchase.',
    image: '/test-images/6.webp',
    imageAlt: 'Quality assurance illustration',
    reverse: true,
  },
];

export function Benefits() {
  return (
    <section className='flex w-full flex-col gap-10 bg-white p-8 md:p-16'>
      {BENEFITS.map((benefit, idx) => (
        <BenefitSection key={idx} {...benefit} />
      ))}
    </section>
  );
}

function BenefitSection({
  title,
  description,
  image,
  imageAlt,
  reverse,
}: {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={`bg-bg flex flex-col md:flex-row ${
        reverse ? 'md:flex-row-reverse' : ''
      }`}
    >
      <div className='flex flex-1 items-center p-6 md:p-10'>
        <div className='flex max-w-xl flex-col gap-6'>
          <h2 className='text-title mb-2 text-3xl font-bold md:text-4xl'>
            {title}
          </h2>
          <span className='bg-primary h-1.5 w-1/4 rounded md:w-1/3'></span>
          <p className='text-base leading-relaxed font-medium text-gray-700 md:text-lg'>
            {description}
          </p>
        </div>
      </div>
      <div className='flex-1 p-6 md:p-10'>
        <div className='relative h-64 w-full md:h-[35rem]'>
          <Image
            src={image}
            fill
            alt={imageAlt}
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 50vw'
            priority={reverse}
          />
        </div>
      </div>
    </div>
  );
}
