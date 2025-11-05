import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { CategoryForm, CategoryFilter } from '@/features/categories/types.ts';
import { create, deleteById, findAll, findById, update } from '@/features/categories/api.ts';
import { createQueryKeys } from '@/lib/queryKeys.ts';

const queryKeys = createQueryKeys<CategoryFilter>('categories');

export function useCategories(filter?: CategoryFilter) {
	return useQuery({
		queryKey: queryKeys.list(filter),
		queryFn: () => findAll(filter),
		placeholderData: keepPreviousData,
		staleTime: 10_000
	});
}

export function useCategory(id: string) {
	return useQuery({
		queryKey: queryKeys.detail(id),
		queryFn: () => findById(id),
		enabled: !!id
	});
}

export function useCreateCategory() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: CategoryForm) => create(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.all }).then();
		}
	});
}

export function useUpdateCategory(id: string) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: CategoryForm) => update(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.detail(id) }).then();
			queryClient.invalidateQueries({ queryKey: queryKeys.all }).then();
		}
	});
}

export function useDeleteCategory(id: string) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => deleteById(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.all }).then();
		}
	});
}
