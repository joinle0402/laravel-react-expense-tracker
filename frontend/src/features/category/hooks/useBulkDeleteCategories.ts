import { useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '@/features/category/services/category.service.ts';
import { toast } from '@/common/libs/toast.ts';
import { categoryKeys } from '@/features/category/constants/categoryKeys.ts';
import { handleApiError } from '@/common/utils/handle-api-error.ts';

export default function UseBulkDeleteCategories() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: categoryService.bulkDelete,
		onSuccess: async ({ message }) => {
			toast.success(message);
			await queryClient.invalidateQueries({ queryKey: categoryKeys.all });
		},
		onError: error => handleApiError({ error }),
	});
}
