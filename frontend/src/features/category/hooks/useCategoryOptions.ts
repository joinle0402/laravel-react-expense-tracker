import { useQuery } from '@tanstack/react-query';
import { categoryKeys } from '@/features/category/constants/categoryKeys.ts';
import { categoryService } from '@/features/category/services/category.service.ts';

type Options = {
	enabled?: boolean;
};

export function useCategoryOptions(type: 'expense' | 'income', options: Options) {
	return useQuery({
		queryKey: categoryKeys.options(type),
		queryFn: () => categoryService.findOptions({ type }),
		enabled: !!type && options.enabled,
		staleTime: 5 * 60 * 1000,
	});
}
