import type { Category, CategoryFilter, CategoryForm } from '@/features/categories/types.ts';
import { http } from '@/lib/http.ts';
import { joinpath } from '@/lib/utils.ts';
import type { Paginated } from '@/types/common.ts';

const root = '/categories';

export async function findAll(filter?: CategoryFilter) {
	return await http.get<Paginated<Category>>(joinpath(root), { params: filter });
}

export async function findById(id: string) {
	return await http.get<Category>(joinpath(root, id));
}

export async function create(payload: CategoryForm) {
	return await http.post<Category>(joinpath(root), { data: payload });
}

export async function update(id: string, payload: CategoryForm) {
	return await http.put<Category>(joinpath(root, id), { data: payload });
}

export async function deleteById(id: string) {
	await http.delete<void>(joinpath(root, id));
}
