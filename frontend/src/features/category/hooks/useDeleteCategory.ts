import { useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '@/features/category/services/category.service.ts';
import { categoryKeys } from '@/features/category/constants/categoryKeys.ts';
import type { MessageResponse } from '@/common/type/api.type.ts';
import { handleApiError } from '@/common/utils/handle-api-error.ts';
import { toast } from '@/common/libs/toast.ts';

export default function useDeleteCategory() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: categoryService.delete,
		onSuccess: async (response: MessageResponse) => {
			toast.success(response.message);
			await queryClient.invalidateQueries({ queryKey: categoryKeys.all });
		},
		onError: error => handleApiError({ error }),
	});
}
