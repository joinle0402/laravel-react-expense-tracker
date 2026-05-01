export type User = {
	id: number;
	name: string;
	email: string;
	email_verified_at?: string | null;
};

export interface VerifyEmailPayload {
	id: string;
	hash: string;
	expires: string;
	signature: string;
}

export interface AuthResponse {
	message: string;
	data: {
		token: string;
		user: User;
	};
}

export interface VerifyEmailResponse {
	message: string;
	data: {
		user: User;
	};
}
