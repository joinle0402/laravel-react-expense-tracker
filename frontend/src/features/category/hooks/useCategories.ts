import { useQuery } from '@tanstack/react-query';
import { categoryService } from '@/features/category/services/category.service';
import type { CategoryParams } from '@/features/category/types/category.type.ts';

export default function useCategories(params: CategoryParams) {
	return useQuery({
		queryKey: ['categories', { params }],
		queryFn: () => categoryService.findAll(params),
		placeholderData: previousData => previousData,
	});
}
