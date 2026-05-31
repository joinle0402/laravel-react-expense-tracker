import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { transactionService } from '@/features/transactions/services/transaction.service.ts';
import type { TransactionFiltersValue } from '@/features/transactions/types/transaction.type.ts';
import { transactionKeys } from '@/features/transactions/constants/transactionKeys.tsx';

export type GetTransactionsParams = TransactionFiltersValue & {
	page: number;
	limit: number;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc' | null;
};

export default function useTransactions(filters: GetTransactionsParams) {
	return useQuery({
		queryKey: transactionKeys.list(filters),
		queryFn: () => transactionService.findAll(filters),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
}
