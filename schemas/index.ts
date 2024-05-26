import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email.',
  }),
  password: z.string().min(1, {
    message: 'Password must be at least 1 character.',
  }),
});

export const registerSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email.',
  }),
  password: z.string().min(6, {
    message: 'Minimum 6 characters required.',
  }),
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
});
