import { http } from '@/lib/http.ts';
import type { ApiResponse, User } from '@/features/auth/auth.model.ts';
import type { RegisterForm } from '@/features/auth/pages/Register.tsx';

export async function me() {
	return await http.get<User>('/auth/me');
}

// export async function login(payload: LoginPayload) {
// 	return await http.post<AuthResponse, LoginPayload>('/auth/login', payload);
// }

export async function register(payload: RegisterForm) {
	return await http.post<ApiResponse<User>, RegisterForm>('/auth/register', payload);
}

export async function resend(email: string) {
	return await http.post<any, { email: string }>('/auth/verify-email/resend', { email });
}

export async function logout() {
	await http.post('/auth/logout', {});
}
