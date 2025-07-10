'use client';

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import type { UserRole } from '@prisma/client';
import { Pen } from 'lucide-react';
import { useState } from 'react';
import { updateUserRole } from '~/server/actions/user';

export function EditRoleAction({
  initialRole,
  userId,
}: {
  initialRole: UserRole;
  userId: string;
}) {
  const [role, setRole] = useState(initialRole);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(role: UserRole) {
    try {
      const { role: newRole } = await updateUserRole(userId, role);
      setRole(newRole);
    } catch {
      setError('Failed to update role. Please try again.');
    }
  }

  return (
    <Listbox onChange={handleChange}>
      <ListboxButton className='group flex cursor-pointer items-center gap-1 p-1 outline-none'>
        <span className='group-hover:text-black'>{role.toLowerCase()}</span>
        <Pen className='size-4 text-gray-500 group-hover:text-black' />
        {error && (
          <p
            className='mx-2 text-sm text-red-600'
            role='alert'
            aria-live='assertive'
          >
            {error}
          </p>
        )}
      </ListboxButton>
      <ListboxOptions
        anchor='bottom'
        className='overflow-hidden rounded-xs border-none bg-white shadow-lg outline-none'
      >
        <ListboxOption
          value='ADMIN'
          className='cursor-pointer p-2 hover:bg-gray-300'
        >
          admin
        </ListboxOption>
        <ListboxOption
          value='USER'
          className='cursor-pointer p-2 hover:bg-gray-300'
        >
          user
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  );
}
