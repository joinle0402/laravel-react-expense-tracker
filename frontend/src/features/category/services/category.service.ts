import { http } from '@/common/libs/axios';
import type {
	CategoryFormValues,
	CategoryPaginatedResponse,
	CategoryParams,
	CategorySubmitResponse,
} from '@/features/category/types/category.type.ts';
import type { MessageResponse } from '@/common/type/api.type.ts';
import { joinPath } from '@/common/utils/str.ts';
import { objectToFormData } from '@/common/utils/object.ts';

const rootPath = '/categories';

export const categoryService = {
	findAll(params: CategoryParams): Promise<CategoryPaginatedResponse> {
		return http.get<CategoryPaginatedResponse>(rootPath, { params });
	},
	export(params: CategoryParams & { ids: number[] | undefined }): Promise<Blob> {
		return http.get<Blob>(joinPath(rootPath, 'export'), { responseType: 'blob', params });
	},
	import(file: File): Promise<MessageResponse> {
		return http.post<MessageResponse>(joinPath(rootPath, 'import'), objectToFormData({ file }), {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	},
	delete(id: string): Promise<MessageResponse> {
		return http.delete<MessageResponse>(joinPath(rootPath, id));
	},
	bulkDelete(ids: number[]): Promise<MessageResponse> {
		return http.delete<MessageResponse>(joinPath(rootPath, 'bulk-delete'), { data: { ids } });
	},
	create(formValues: CategoryFormValues): Promise<CategorySubmitResponse> {
		return http.post<CategorySubmitResponse>(rootPath, formValues);
	},
	update(id: string, formValues: CategoryFormValues): Promise<CategorySubmitResponse> {
		return http.put<CategorySubmitResponse>(joinPath(rootPath, id), formValues);
	},
};
