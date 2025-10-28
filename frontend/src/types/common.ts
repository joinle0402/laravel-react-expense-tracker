interface PaginationLinks {
	first?: string | null;
	last?: string | null;
	prev?: string | null;
	next?: string | null;
}

interface PaginationMetaLink {
	url: string | null;
	page?: string | null;
	label: string;
	active: boolean;
}

interface PaginationMeta {
	current_page: number;
	from?: number | null;
	last_page: number;
	path?: string;
	per_page: number;
	to?: number | null;
	total: number;
	links?: PaginationMetaLink[];
}

export interface Paginated<T> {
	data: T[];
	links?: PaginationLinks;
	meta?: PaginationMeta;
}

export type PaginatedParams<T> = T & {
	page?: number;
	per_page?: number;
};
