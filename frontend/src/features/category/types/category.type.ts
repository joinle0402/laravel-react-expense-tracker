import type { PaginatedResponse } from '@/common/type/api.type.ts';

export type CategoryType = 'income' | 'expense';

export type Category = {
	id: string;
	name: string;
	type: CategoryType;
	is_system: boolean;
	is_deleted: boolean;
	user_id: number;
	deleted_at?: string | null;
	created_at: string;
	updated_at: string;
};

export type CategoryTab = 'all' | 'expense' | 'income' | 'deleted';

export type CategoryTabCounts = {
	all: number;
	expense: number;
	income: number;
	deleted: number;
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
