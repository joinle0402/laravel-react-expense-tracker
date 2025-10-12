export interface User {
	id: string;
	name: string;
	email: string;
	verified: string;
}

export interface AuthResponse {
	access_token: string;
	user: User;
}

export interface ApiResponse<T> {
	message: string;
	data: T;
}
