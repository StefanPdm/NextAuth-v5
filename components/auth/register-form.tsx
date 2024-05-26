'use client';

import CardWrapper from './card-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod'; // for validation
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
// after adding shadcn 'Form' also add shadcn 'Input'
import { Input } from '@/components/ui/input';
import { registerSchema } from '@/schemas';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { register } from '@/server-actions/register';
import { useTransition, useState } from 'react';

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  // create a hook to handle form state
  const loginForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema), // for validation
    defaultValues: {
      name: 'Stefan',
      email: 'stefan@stefan.de',
      password: 'stefan',
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    startTransition(() => {
      register(values).then((data) => {
        setSuccess(data.success || '');
        setError(data.error || '');
      });
    });
  }

  function onCancel() {
    console.log('cancel');
  }

  return (
    <CardWrapper
      headerLabel='Hello. Please enter your details to register'
      backButtonLabel='Have an account? Log in here!'
      backButtonHref='/auth/login'
      showSocial>
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmit)}
          className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={loginForm.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      placeholder='John Doe'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{' '}
            <FormField
              control={loginForm.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='email'
                      placeholder='john@john.de'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='*****'
                      {...field}
                      type='password'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <div className='flex justify-end gap-4'>
            <Button
              type='button'
              size='lg'
              className='w-full'
              onClick={onCancel}>
              Cancel
            </Button>

            <Button
              type='submit'
              size='lg'
              className='w-full'
              disabled={isPending}>
              Register
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}
