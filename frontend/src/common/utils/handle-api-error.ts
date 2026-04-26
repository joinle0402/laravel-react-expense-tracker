import { isAxiosError } from 'axios';
import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import type { ApiErrorResponse } from '@/common/type/api.type.ts';
import { toast } from '@/common/libs/toast.ts';
import { uppercaseFirst } from '@/common/utils/str.ts';

type HandleApiErrorParams<TFieldValues extends FieldValues> = {
	error: unknown;
	setError?: UseFormSetError<TFieldValues>;
	defaultMessage?: string;
};

export const handleApiError = <TFieldValues extends FieldValues>({
	error,
	setError,
	defaultMessage = 'Có lỗi xảy ra, vui lòng thử lại.',
}: HandleApiErrorParams<TFieldValues>) => {
	if (isAxiosError<ApiErrorResponse>(error)) {
		const status = error.response?.status;
		const data = error.response?.data;

		if (status === 422 && data?.errors && setError) {
			Object.entries(data.errors).forEach(([field, messages]) => {
				const message = messages?.[0];
				if (!message) return;
				setError(field as Path<TFieldValues>, {
					type: 'server',
					message: uppercaseFirst(message),
				});
			});
			return;
		}

		if (data?.message) {
			toast.error(data.message);
			return;
		}

		if (error.message) {
			toast.error(error.message);
			return;
		}
	}

	toast.error(defaultMessage);
};

export function getErrorMessage(error: unknown): string {
	if (isAxiosError<ApiErrorResponse>(error)) {
		const data = error.response?.data;

		if (data?.message) return data.message;

		const firstFieldError = data?.errors ? Object.values(data.errors)[0]?.[0] : null;

		if (firstFieldError) return firstFieldError;
	}

	return 'Có lỗi xảy ra. Vui lòng thử lại.';
}
