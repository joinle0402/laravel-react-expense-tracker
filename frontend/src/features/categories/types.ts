import { z } from 'zod';
import { CategoryFormSchema } from '@/features/categories/schemas.ts';
import type { PaginatedParams } from '@/types/common.ts';

export type CategoryForm = z.infer<typeof CategoryFormSchema>;

export type Category = {
	id?: string;
} & CategoryForm;

export type CategoryFilter = PaginatedParams<Partial<Pick<Category, 'name' | 'type'>>>;
