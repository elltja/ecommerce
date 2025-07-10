import { Benefits } from '~/components/sections/Benefits';
import { Features } from '~/components/sections/Features';

import { Hero } from '~/components/sections/Hero';

export default async function HomePage() {
  return (
    <div className='w-full max-w-screen overflow-x-hidden'>
      <Hero />
      <Features />
      <Benefits />
    </div>
  );
}
