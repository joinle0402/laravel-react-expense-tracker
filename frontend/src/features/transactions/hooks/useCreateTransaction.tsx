import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionService } from '@/features/transactions/services/transaction.service.ts';
import type { MessageDataResponse } from '@/common/type/api.type.ts';
import { toast } from '@/common/libs/toast.ts';
import type { Transaction } from '@/features/transactions/types/transaction.type.ts';
import { transactionKeys } from '@/features/transactions/constants/transactionKeys.tsx';

export default function useCreateTransaction() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: transactionService.create,
		onSuccess: async (response: MessageDataResponse<Transaction>) => {
			toast.success(response.message);
			await queryClient.invalidateQueries({ queryKey: transactionKeys.all });
		},
	});
}
