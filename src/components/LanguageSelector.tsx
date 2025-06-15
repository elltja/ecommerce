'use client';

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Suspense, useTransition } from 'react';
import { usePathname, useRouter } from '~/i18n/navigation';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'sv', name: 'Swedish' },
];

export function LanguageSelector() {
  return (
    <Suspense>
      <SuspenseBoundary />
    </Suspense>
  );
}

function SuspenseBoundary() {
  const locale = useLocale();
  const router = useRouter();
  const [, startTransation] = useTransition();
  const pathname = usePathname();

  function onSelectChange(nextLocale: string) {
    startTransation(() => {
      router.replace(
        {
          pathname,
        },
        { locale: nextLocale },
      );
    });
  }

  return (
    <Listbox defaultValue='en' onChange={onSelectChange}>
      <ListboxButton className='hover:text-primary flex cursor-pointer items-center gap-1 p-1 outline-none'>
        {({ open }) => (
          <>
            <Globe className='mx-1 size-4.5' />
            {languages.find((l) => l.code === (locale ?? 'en'))?.name}
            <ArrowSvgIcon open={open} />
          </>
        )}
      </ListboxButton>
      <ListboxOptions
        anchor='bottom'
        className='overflow-hidden rounded-xs border-none outline-none'
      >
        {languages.map((lang) => (
          <ListboxOption
            key={lang.code}
            value={lang.code}
            className='cursor-pointer bg-white p-2 hover:bg-gray-300'
          >
            {lang.name}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}

function ArrowSvgIcon({ open }: { open: boolean }) {
  return (
    <svg
      width='20'
      height='20'
      className='inline-block'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline
        points='6 12 10 8 14 12'
        transform={open ? 'rotate(180 10 10)' : undefined}
      />
    </svg>
  );
}
