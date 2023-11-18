import { z } from 'zod';

export const productValidationSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required.' }),
  brand: z.string().min(1, { message: 'Brand name is required.' }),
  imageUrl: z.string().optional(),
  description: z.string().optional(),
  price: z.object({
    min: z.number(),
    max: z.number(),
    note: z.string().optional(),
  }),
  features: z
    .object({
      display: z.string().optional(),
      processor: z.string().optional(),
      ram: z.string().optional(),
      storage: z.string().optional(),
      camera: z.string().optional(),
      connectivity: z.string().optional(),
    })
    .optional(),
});

export const UserValidationSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z
    .string()
    .min(1, 'Email is required.')
    .refine(
      (email) => email.endsWith('@gmail.com'),
      'Email must end with "@gmail.com"'
    ),
  number: z
    .string()
    .length(10, { message: 'Mobile number be 10 characters long' }),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  isAdmin: z.boolean().default(false),
});
