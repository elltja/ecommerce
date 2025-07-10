'use client';

import { StarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function ReviewStars({
  rating,
  onStarClick,
}: {
  rating: number;
  onStarClick?: (starIndex: number) => void;
}) {
  const t = useTranslations('product');
  return (
    <div className='flex items-center gap-2'>
      <div className='flex items-center gap-0.5'>
        {Array.from({ length: 5 }).map((_, idx) => {
          const startNr = idx + 1;
          const filled = startNr <= rating;
          return (
            <StarIcon
              key={idx}
              fill={filled ? `#f4c836` : '#f1e6c1'}
              stroke='transparent'
              className='size-5'
              onClick={() =>
                typeof onStarClick === 'function' && onStarClick(startNr)
              }
            />
          );
        })}
      </div>
      <p>({rating || t('noReviews')})</p>
    </div>
  );
}
