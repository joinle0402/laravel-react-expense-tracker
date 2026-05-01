import type { PaginatedResponse } from '@/common/type/api.type.ts';

export type CategoryType = 'income' | 'expense';

export type Category = {
	id: string;
	name: string;
	type: CategoryType;
	user_id: number;
	created_at: string;
	updated_at: string;
};

export type CategoryTab = 'all' | 'expense' | 'income';

export type CategoryTabCounts = {
	all: number;
	expense: number;
	income: number;
};

export type CategoryPaginatedResponse = PaginatedResponse<Category> & {
	meta: {
		counts: CategoryTabCounts;
	};
};

export type CategoryParams = {
	tab: CategoryTab;
	search: string;
	page: number;
	limit: number;
};
