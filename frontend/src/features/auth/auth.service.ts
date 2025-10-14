import { http } from '@/lib/http.ts';
import type { ApiResponse, AuthResponse, User } from '@/features/auth/auth.model.ts';
import type { RegisterForm } from '@/features/auth/pages/Register.tsx';
import type { LoginForm } from '@/features/auth/pages/Login.tsx';

export async function me() {
	return await http.get<User>('/auth/me');
}

export async function login(payload: LoginForm) {
	return await http.post<ApiResponse<AuthResponse>, LoginForm>('/auth/login', payload);
}

export async function register(payload: RegisterForm) {
	return await http.post<ApiResponse<User>, RegisterForm>('/auth/register', payload);
}

export async function resend(email: string) {
	return await http.post<{ message: string }, { email: string }>('/auth/verify-email/resend', { email });
}

export async function logout() {
	await http.post('/auth/logout', {});
}
