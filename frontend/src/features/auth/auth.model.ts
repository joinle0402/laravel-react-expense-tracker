export interface User {
	id: string;
	name: string;
	email: string;
	email_verified_at: string;
	verified: boolean;
}

export interface AuthResponse {
	access_token: string;
	user: User;
}

export interface ApiResponse<T> {
	message: string;
	data: T;
}
