import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionService } from '@/features/transactions/services/transaction.service.ts';
import type { MessageResponse } from '@/common/type/api.type.ts';
import { handleApiError } from '@/common/utils/handle-api-error.ts';
import { toast } from '@/common/libs/toast.ts';
import { transactionKeys } from '@/features/transactions/constants/transactionKeys.tsx';

export default function useDeleteTransaction() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number): Promise<MessageResponse> => transactionService.delete(id),
		onSuccess: async (response: MessageResponse) => {
			toast.success(response.message);
			await queryClient.invalidateQueries({ queryKey: transactionKeys.all });
		},
		onError: (error: Error) => handleApiError({ error }),
	});
}
