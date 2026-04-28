import { http } from '@/common/libs/axios';
import type { Pagination } from '@/common/type/api.type.ts';
import type { Category } from '@/features/category/types/category.type.ts';

export const categoryService = {
	findAll(): Promise<Pagination<Category>> {
		return http.get<Pagination<Category>>('/categories');
	},
};
