import { http } from '@/common/libs/axios';
import type { PaginatedResponse } from '@/common/type/api.type.ts';
import type { Category, CategoryParams } from '@/features/category/types/category.type.ts';

export const categoryService = {
	findAll(params: CategoryParams): Promise<PaginatedResponse<Category>> {
		return http.get<PaginatedResponse<Category>>('/categories', { params });
	},
};
