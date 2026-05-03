import { useMutation } from '@tanstack/react-query';
import { categoryService } from '@/features/category/services/category.service.ts';
import { downloadExcel } from '@/common/utils/file.ts';

export default function useExportCategories() {
	return useMutation({
		mutationFn: categoryService.export,
		onSuccess: (response: Blob) => {
			downloadExcel(response, 'categories_' + Date.now() + '.xlsx');
		},
	});
}
