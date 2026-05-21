import { http } from '@/common/libs/axios.ts';
import type {
	TransactionPaginated,
	CreateTransactionPayload,
	Transaction,
	TransactionFiltersValue,
} from '@/features/transactions/types/transaction.type.ts';
import { joinPath } from '@/common/utils/str.ts';
import type { MessageDataResponse } from '@/common/type/api.type.ts';

const rootPath = '/transactions';

export const transactionService = {
	findAll(params: TransactionFiltersValue): Promise<TransactionPaginated> {
		return http.get<TransactionPaginated>(joinPath(rootPath), { params });
	},
	create(data: CreateTransactionPayload): Promise<MessageDataResponse<Transaction>> {
		return http.post(joinPath(rootPath), data);
	},
};
