import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/features/auth/auth.service.ts';
import { queryKeys } from '@/lib/queryKeys.ts';
import { tokenStore } from '@/lib/storage.ts';
import type { User } from '@/features/auth/auth.model.ts';
import { toast } from 'sonner';

export default function useLogout() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	return useMutation({
		mutationFn: logout,
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: queryKeys.me });
			const prev = queryClient.getQueryData(queryKeys.me) as User;
			queryClient.setQueryData(queryKeys.me, null);
			return { prev };
		},
		onError: (_e, _v, context) => {
			queryClient.setQueryData(queryKeys.me, context?.prev);
		},
		onSuccess: () => {
			tokenStore.access = null;
			toast.success('Đăng xuất thành công!');
			navigate('/login', { replace: true });
		}
	});
}
