import { useForm, type UseFormProps, type UseFormReturn, type FieldValues, type DefaultValues } from 'react-hook-form';
import { z, type ZodObject } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import defaultsDeep from 'lodash/defaultsDeep';
import type { ZodTypeAny } from 'zod/v3';

// @ts-ignore
export function useZodForm<TSchema extends ZodObject<any> | ZodTypeAny, TValues extends FieldValues = z.infer<TSchema>>(
	schema: TSchema,
	defaults?: DefaultValues<TValues>,
	options?: Omit<UseFormProps<TValues>, 'resolver' | 'defaultValues'>
): UseFormReturn<TValues> {
	const schemaDefaults = ((): DefaultValues<TValues> => {
		try {
			// @ts-expect-error:
			const v = schema.partial().parse({});
			return v as DefaultValues<TValues>;
		} catch {
			return {} as DefaultValues<TValues>;
		}
	})();

	const mergedDefaults = defaultsDeep({} as DefaultValues<TValues>, defaults ?? {}, schemaDefaults);

	return useForm<TValues>({
		resolver: zodResolver(schema as any),
		defaultValues: mergedDefaults,
		...options
	});
}
