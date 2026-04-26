import type { User } from '@/features/auth/types/auth.type.ts';

const TOKEN_KEY = 'access_token';
const USER_KEY = 'auth_user';

export function saveAuth(token: string, user: User) {
	localStorage.setItem(TOKEN_KEY, token);
	localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth() {
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(USER_KEY);
}

export function getStoredToken(): string | null {
	return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): User | null {
	const raw = localStorage.getItem(USER_KEY);
	return raw ? (JSON.parse(raw) as User) : null;
}

export function setStoredUser(user: User) {
	localStorage.setItem(USER_KEY, JSON.stringify(user));
}
