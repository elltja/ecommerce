import { useTranslations } from 'next-intl';

export function TopBanner() {
  const t = useTranslations('layouts.header');
  return (
    <div className='bg-primary flex w-full justify-center p-2 text-white'>
      {t('bannerMessage')}
    </div>
  );
}
