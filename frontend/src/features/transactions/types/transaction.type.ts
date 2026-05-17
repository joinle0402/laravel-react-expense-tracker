import type { ResourcePaginatedResponse } from '@/common/type/api.type.ts';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
	id: number;
	user_id: number;
	category_id: number;
	dated: string;
	type: TransactionType;
	amount: number;
	note: string;
	created_at: string;
	updated_at: string;
	category?: {
		id: number;
		name: string;
		type: TransactionType;
	};
}

export type TransactionPaginated = ResourcePaginatedResponse<Transaction>;
