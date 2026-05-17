import { http } from '@/common/libs/axios.ts';
import type { TransactionPaginated, CreateTransactionPayload, Transaction } from '@/features/transactions/types/transaction.type.ts';
import { joinPath } from '@/common/utils/str.ts';
import type { MessageDataResponse } from '@/common/type/api.type.ts';

const rootPath = '/transactions';

export const transactionService = {
	findAll(): Promise<TransactionPaginated> {
		return http.get<TransactionPaginated>(joinPath(rootPath));
	},
	create(data: CreateTransactionPayload): Promise<MessageDataResponse<Transaction>> {
		return http.post(joinPath(rootPath), data);
	},
};
