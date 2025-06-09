import { Hero } from '~/components/Hero';

export default function HomePage() {
  return (
    <div className='w-full max-w-screen overflow-x-hidden'>
      <Hero />
      <section className='bg-bg h-40 w-full shadow-sm'></section>
    </div>
  );
}
