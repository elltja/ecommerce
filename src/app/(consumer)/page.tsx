import { Benefits } from '~/components/Benefits';
import { Features } from '~/components/Features';

import { Hero } from '~/components/Hero';

export default function HomePage() {
  return (
    <div className='w-full max-w-screen overflow-x-hidden'>
      <Hero />
      <Features />
      <Benefits />
    </div>
  );
}
