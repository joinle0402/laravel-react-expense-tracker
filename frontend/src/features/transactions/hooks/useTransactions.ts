import { useQuery } from '@tanstack/react-query';
import { transactionService } from '@/features/transactions/services/transaction.service.ts';
import type { TransactionFiltersValue } from '@/features/transactions/types/transaction.type.ts';
import { transactionKeys } from '@/features/transactions/constants/transactionKeys.tsx';

export default function useTransactions(filters: TransactionFiltersValue) {
	return useQuery({
		queryKey: transactionKeys.list(filters),
		queryFn: () => transactionService.findAll(filters),
	});
}
