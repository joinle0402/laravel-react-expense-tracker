export interface MessageResponse {
	message: string;
}

export interface BulkDeleteResponse {
	message: string;
	deleted_count: number;
	deleted_ids: number[];
}

export type ApiErrorResponse = {
	message?: string;
	errors?: Record<string, string[]>;
};

export type PaginationLink = {
	url: string | null;
	label: string;
	page: number | null;
	active: boolean;
};

export type PaginatedResponse<T> = {
	current_page: number;
	data: T[];

	first_page_url: string;
	from: number | null;
	last_page: number;
	last_page_url: string;
	links: PaginationLink[];
	next_page_url: string | null;
	path: string;
	per_page: number;
	prev_page_url: string | null;
	to: number | null;
	total: number;
};

export type ResourcePaginatedResponse<T> = {
	data: T[];
	links: {
		first: string | null;
		last: string | null;
		prev: string | null;
		next: string | null;
	};
	meta: {
		current_page: number;
		from: number | null;
		last_page: number;
		links: PaginationLink[];
		path: string;
		per_page: number;
		to: number | null;
		total: number;
	};
};
