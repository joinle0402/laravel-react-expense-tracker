import { createQueryKeys } from '@/common/utils/query.ts';

export const transactionKeys = {
	...createQueryKeys(['transactions'] as const),
};
