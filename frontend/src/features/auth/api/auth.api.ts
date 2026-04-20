import type { RegisterPayload } from '@/features/auth/schema/auth.schema.ts';
import { http } from '@/common/libs/axios.ts';
import type { MessageResponse } from '@/common/type/api.type.ts';

export const authApi = {
	async register(payload: RegisterPayload): Promise<MessageResponse> {
		return http.post<MessageResponse>('/auth/register', payload);
	},
};
