export interface MessageResponse {
	message: string;
}

export type ApiErrorResponse = {
	message?: string;
	errors?: Record<string, string[]>;
};
