'use server';

import { z } from 'zod';
import { loginSchema } from '../schemas';

// server action
export async function login(values: z.infer<typeof loginSchema>) {
  // normally you would send this to the server
  // axios.post('/api/login', values)

  console.log(values);
  const validatedFields = loginSchema.safeParse(values); // validation in the backend
  console.log(validatedFields); // { success: true, data: {... } }

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  return { success: 'Successful login.' };
}
