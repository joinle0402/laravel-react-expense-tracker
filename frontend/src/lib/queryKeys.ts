export const queryKeys = {
	me: ['auth', 'me'] as const,
	categories: ['categories'] as const
};

export function createQueryKeys<TParams = unknown>(entity: string) {
	return {
		all: [entity] as const,
		list: (params?: TParams) => [entity, 'list', params ?? null] as const,
		detail: (id: string | number) => [entity, 'detail', id] as const
	};
}
