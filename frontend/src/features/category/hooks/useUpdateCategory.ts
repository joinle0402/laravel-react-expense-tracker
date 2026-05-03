import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CategoryFormValues, CategorySubmitResponse } from '@/features/category/types/category.type.ts';
import { categoryService } from '@/features/category/services/category.service.ts';
import { toast } from '@/common/libs/toast.ts';
import { categoryKeys } from '@/features/category/constants/categoryKeys.ts';

export default function useUpdateCategory() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, ...formValues }: CategoryFormValues) => categoryService.update(id!, formValues),
		onSuccess: async (response: CategorySubmitResponse) => {
			toast.success(response.message);
			await queryClient.invalidateQueries({ queryKey: categoryKeys.all });
		},
	});
}
