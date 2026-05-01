import type { CategoryParams } from '@/features/category/types/category.type.ts';

export const categoryKeys = {
	all: ['categories'] as const,
	lists: () => [...categoryKeys.all, 'list'] as const,
	list: (params: CategoryParams) => [...categoryKeys.lists(), params] as const,
	detail: (id: string) => [...categoryKeys.all, 'detail', id] as const,
};
