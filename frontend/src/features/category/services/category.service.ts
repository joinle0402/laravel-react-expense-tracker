import { http } from '@/common/libs/axios';
import type { CategoryPaginatedResponse, CategoryParams } from '@/features/category/types/category.type.ts';

export const categoryService = {
	findAll(params: CategoryParams): Promise<CategoryPaginatedResponse> {
		return http.get<CategoryPaginatedResponse>('/categories', { params });
	},
};
