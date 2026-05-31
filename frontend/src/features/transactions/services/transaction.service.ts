import { http } from '@/common/libs/axios.ts';
import type { TransactionPaginated, CreateTransactionPayload, Transaction } from '@/features/transactions/types/transaction.type.ts';
import { joinPath } from '@/common/utils/str.ts';
import type { MessageDataResponse, MessageResponse } from '@/common/type/api.type.ts';
import type { GetTransactionsParams } from '@/features/transactions/hooks/useTransactions.ts';

const rootPath = '/transactions';

export const transactionService = {
	findAll(params: GetTransactionsParams): Promise<TransactionPaginated> {
		return http.get<TransactionPaginated>(joinPath(rootPath), { params });
	},
	create(data: CreateTransactionPayload): Promise<MessageDataResponse<Transaction>> {
		return http.post(joinPath(rootPath), data);
	},
	delete(id: number): Promise<MessageResponse> {
		return http.delete<MessageResponse>(joinPath(rootPath, 'bulk-delete'), { params: { id } });
	},
	bulkDelete(ids: string[]): Promise<MessageResponse> {
		return http.delete<MessageResponse>(joinPath(rootPath, 'bulk-delete'), { params: { id: ids.join(',') } });
	},
};
