import { z } from 'zod';

export const LoginSchema = z.object({
	email: z.email('Invalid email!').trim().toLowerCase().default(''),
	password: z.string().min(4, 'Password must be at least 4 characters').default('')
});

export type LoginPayload = z.infer<typeof LoginSchema>;
