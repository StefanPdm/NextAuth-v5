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
import { loginSchema } from '@/schemas';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { login } from '@/server-actions/login';
import { useTransition, useState } from 'react';

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  // create a hook to handle form state
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema), // for validation
    defaultValues: {
      email: 'stefan@stefan.de',
      password: 'stefan',
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    startTransition(() => {
      login(values).then((data) => {
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
      headerLabel='Welcome back! Please Log In here.'
      backButtonLabel="Don't have an account? Sign up here!"
      backButtonHref='/auth/register'
      showSocial>
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmit)}
          className='space-y-6'>
          <div className='space-y-4'>
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
              Login
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}
