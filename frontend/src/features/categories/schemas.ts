import { z } from 'zod';

export const CategoryFormSchema = z.object({
	name: z.string().min(1, 'Tên danh mục là bắt buộc!').max(100).default(''),
	icon: z.string().min(1, 'Ảnh danh mục là bắt buộc!').max(100).default(''),
	type: z.enum(['expense', 'income'])
});
