'use client';

import { Button, Input } from '@headlessui/react';
import { Mail } from 'lucide-react';
import Form from 'next/form';
import { useActionState, useId } from 'react';
import { emailSignIn, type FormState } from '~/server/actions/auth';
import { LoadingTextSwap } from './LoadingTextSwap';

export function EmailAuthForm() {
  const [state, action, isPending] = useActionState<FormState, FormData>(
    emailSignIn,
    {
      error: null,
    },
  );
  const id = useId();
  return (
    <Form action={action} className='flex flex-col gap-5'>
      <label
        htmlFor={`email-${id}`}
        className='flex items-center gap-3 rounded border border-gray-200 p-3'
      >
        <Mail className='text-gray-400' />
        <Input
          aria-invalid={!!state.error}
          aria-label='email'
          type='email'
          placeholder='you@example.com'
          className='outline-none'
          id={`email-${id}`}
          name='email'
        />
      </label>
      {state.error && (
        <p className='text-red-600' aria-live='assertive'>
          {state.error}
        </p>
      )}
      <Button
        disabled={isPending}
        className='bg-primary hover:bg-primary-hover flex w-full cursor-pointer items-center justify-center gap-2 rounded-full py-3 text-center font-semibold text-white transition-colors duration-300'
        type='submit'
      >
        <LoadingTextSwap isLoading={isPending}>Continue</LoadingTextSwap>
      </Button>
    </Form>
  );
}
