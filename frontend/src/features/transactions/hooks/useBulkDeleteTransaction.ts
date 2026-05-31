import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { MessageResponse } from '@/common/type/api.type.ts';
import { transactionService } from '@/features/transactions/services/transaction.service.ts';
import { toast } from '@/common/libs/toast.ts';
import { transactionKeys } from '@/features/transactions/constants/transactionKeys.tsx';
import { handleApiError } from '@/common/utils/handle-api-error.ts';

export default function useBulkDeleteTransaction() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (ids: string[]): Promise<MessageResponse> => transactionService.bulkDelete(ids),
		onSuccess: async (response: MessageResponse) => {
			toast.success(response.message);
			await queryClient.invalidateQueries({ queryKey: transactionKeys.all });
		},
		onError: (error: Error) => handleApiError({ error }),
	});
}
