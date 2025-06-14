'use client';

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { Globe } from 'lucide-react';
import { Suspense } from 'react';
import { useUrlParam } from '~/hooks/useUrlParam';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
];

export function LanguageSelector() {
  return (
    <Suspense>
      <SuspenseBoundary />
    </Suspense>
  );
}

function SuspenseBoundary() {
  const [selected, setSelected] = useUrlParam('lang');

  return (
    <Listbox value={selected} onChange={(code: string) => setSelected(code)}>
      <ListboxButton className='hover:text-primary flex cursor-pointer items-center gap-1 p-1 outline-none'>
        {({ open }) => (
          <>
            <Globe className='mx-1 size-4.5' />
            {languages.find((l) => l.code === (selected ?? 'en'))?.name}
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
