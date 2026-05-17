import { http } from '@/common/libs/axios.ts';
import type { TransactionPaginated } from '@/features/transactions/types/transaction.type.ts';
import { joinPath } from '@/common/utils/str.ts';

const rootPath = '/transactions';

export const transactionService = {
	findAll(): Promise<TransactionPaginated> {
		return http.get<TransactionPaginated>(joinPath(rootPath));
	},
};
