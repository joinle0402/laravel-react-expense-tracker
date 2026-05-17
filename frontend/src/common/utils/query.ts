export function createQueryKeys<const TPrefix extends readonly string[]>(prefix: TPrefix) {
	return {
		all: prefix,
		lists: () => [...prefix, 'list'] as const,
		list: <TParams>(params: TParams) => [...prefix, 'list', params] as const,
		details: () => [...prefix, 'detail'] as const,
		detail: <TId extends string | number>(id: TId) => [...prefix, 'detail', id] as const,
	};
}
