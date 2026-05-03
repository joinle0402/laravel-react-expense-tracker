import { http } from '@/common/libs/axios';
import type {
	CategoryFormValues,
	CategoryPaginatedResponse,
	CategoryParams,
	CategorySubmitResponse,
} from '@/features/category/types/category.type.ts';
import type { MessageResponse } from '@/common/type/api.type.ts';
import { joinPath } from '@/common/utils/str.ts';

const rootPath = '/categories';

export const categoryService = {
	findAll(params: CategoryParams): Promise<CategoryPaginatedResponse> {
		return http.get<CategoryPaginatedResponse>(rootPath, { params });
	},
	delete(id: string): Promise<MessageResponse> {
		return http.delete<MessageResponse>(joinPath(rootPath, id));
	},
	create(formValues: CategoryFormValues): Promise<CategorySubmitResponse> {
		return http.post<CategorySubmitResponse>(rootPath, formValues);
	},
	update(id: string, formValues: CategoryFormValues): Promise<CategorySubmitResponse> {
		return http.put<CategorySubmitResponse>(joinPath(rootPath, id), formValues);
	},
};
