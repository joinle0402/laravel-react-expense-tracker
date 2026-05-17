import { useQuery } from '@tanstack/react-query';
import { transactionService } from '@/features/transactions/services/transaction.service.ts';

export default function useTransactions() {
	return useQuery({
		queryKey: ['transactions'],
		queryFn: transactionService.findAll,
	});
}
