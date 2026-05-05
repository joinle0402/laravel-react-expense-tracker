import { useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '@/features/category/services/category.service.ts';
import { handleApiError } from '@/common/utils/handle-api-error.ts';
import { toast } from '@/common/libs/toast.ts';
import { categoryKeys } from '@/features/category/constants/categoryKeys.ts';

export default function useImportCategories() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: categoryService.import,
		onSuccess: async ({ message }) => {
			toast.success(message);
			await queryClient.invalidateQueries({ queryKey: categoryKeys.all });
		},
		onError: (error: Error) => handleApiError({ error }),
	});
}
