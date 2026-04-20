import { z } from 'zod';

export const LoginSchema = z.object({
	email: z.email('Email không hợp lệ'),
	password: z.string().min(4, 'Mật khẩu tối thiểu 6 ký tự'),
});

export type LoginPayload = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
	.object({
		name: z.string().min(1, 'Tên không được để trống'),
		email: z.email('Email không hợp lệ'),
		password: z.string().min(1, 'Mật khẩu tối thiểu 4 ký tự'),
		password_confirmation: z.string().min(1, 'Vui lòng nhập lại mật khẩu'),
	})
	.refine((data) => data.password === data.password_confirmation, {
		message: 'Mật khẩu nhập lại không khớp',
		path: ['password_confirmation'],
	});

export type RegisterPayload = z.infer<typeof RegisterSchema>;
