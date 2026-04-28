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
