'use server';

import { z } from 'zod';
import { registerSchema } from '../schemas';

// server action
export async function register(values: z.infer<typeof registerSchema>) {
  // normally you would send this to the server
  // axios.post('/api/login', values)

  console.log(values);
  const validatedFields = registerSchema.safeParse(values); // validation in the backend
  console.log(validatedFields); // { success: true, data: {... } }

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  return { success: 'Successful registration.' };
}
