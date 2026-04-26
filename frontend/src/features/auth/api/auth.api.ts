import type { RegisterPayload } from '@/features/auth/schema/auth.schema.ts';
import { http } from '@/common/libs/axios.ts';
import type { MessageResponse } from '@/common/type/api.type.ts';
import type { AuthResponse, User, VerifyEmailPayload, VerifyEmailResponse } from '@/features/auth/types/auth.type.ts';

export const authApi = {
	async register(payload: RegisterPayload): Promise<AuthResponse> {
		return http.post<AuthResponse>('/auth/register', payload);
	},
	me() {
		return http.get<User>('/auth/me');
	},
	resendEmail() {
		return http.post<MessageResponse>('/auth/email/resend');
	},
	verifyEmail(payload: VerifyEmailPayload) {
		const { id, hash, expires, signature } = payload;
		const query = new URLSearchParams({ expires, signature }).toString();
		return http.get<VerifyEmailResponse>(`/auth/email/verify/${id}/${hash}?${query}`);
	},
};
