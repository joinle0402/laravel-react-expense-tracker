import { useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '@/features/category/services/category.service.ts';
import type { CategoryFormValues, CategorySubmitResponse } from '@/features/category/types/category.type.ts';
import { categoryKeys } from '@/features/category/constants/categoryKeys.ts';
import { toast } from '@/common/libs/toast.ts';

export default function useCreateCategory() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (formValues: CategoryFormValues) => categoryService.create(formValues),
		onSuccess: async (response: CategorySubmitResponse) => {
			toast.success(response.message);
			await queryClient.invalidateQueries({ queryKey: categoryKeys.all });
		},
	});
}
