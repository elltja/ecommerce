import { Benefits } from '~/components/Benefits';
import { Features } from '~/components/Features';
import { Footer } from '~/components/Footer';
import { Hero } from '~/components/Hero';

export default function HomePage() {
  return (
    <div className='w-full max-w-screen overflow-x-hidden'>
      <Hero />
      <Features />
      <Benefits />
      <Footer />
    </div>
  );
}
