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

export interface TransactionSummary {
	totalIncome: number;
	totalExpense: number;
	balance: number;
	transactionCount: number;
}

export interface CreateTransactionPayload {
	type: TransactionType;
	category_id: number;
	amount: number;
	dated: string;
	note?: string;
}

export type TransactionPaginated = ResourcePaginatedResponse<Transaction, TransactionSummary>;

export type TransactionTypeFilter = 'all' | 'income' | 'expense';

export type TransactionFiltersValue = {
	search: string;
	type: TransactionTypeFilter;
	fromDate: string | null;
	toDate: string | null;
};
