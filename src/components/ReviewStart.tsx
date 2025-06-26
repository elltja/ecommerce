import { StarIcon } from 'lucide-react';

export function ReviewStars() {
  return (
    <div className='flex cursor-pointer items-center gap-2'>
      <div className='flex items-center gap-0.5'>
        <StarIcon fill='#f4c836' stroke='transparent' className='size-5' />
        <StarIcon fill='#f4c836' stroke='transparent' className='size-5' />
        <StarIcon fill='#f4c836' stroke='transparent' className='size-5' />
        <StarIcon fill='#f4c836' stroke='transparent' className='size-5' />
        <StarIcon fill='#f1e6c1' stroke='transparent' className='size-5' />
      </div>
      <p>(4.5)</p>
    </div>
  );
}
