import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AuthResponse, User } from '@/features/auth/auth.model.ts';
import { logout, me, register } from '@/features/auth/auth.service.ts';
import type { LoginPayload } from '@/features/auth/auth.schema.ts';
import { tokenStore } from '@/lib/storage.ts';

const QUERY_KEY_ME = ['auth', 'me'];

export function useAuthUser() {
	return useQuery<User>({ queryKey: QUERY_KEY_ME, queryFn: me, staleTime: 1000 * 60 * 5 });
}

export function useLogin() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: LoginPayload) => login(payload),
		onSuccess: (response: AuthResponse) => {
			tokenStore.access = response.access_token;
			queryClient.setQueryData(QUERY_KEY_ME, response.user);
		}
	});
}

export function useRegister() {
	return useMutation({ mutationFn: (payload: RegisterPayload) => register(payload) });
}

export function useLogout() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => logout(),
		onSuccess: () => {
			tokenStore.access = null;
			queryClient.removeQueries({ queryKey: ['auth'] });
		}
	});
}
