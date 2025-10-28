import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import type { ButtonHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import type { UseMutationResult } from '@tanstack/react-query';

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	label?: string;
	loading?: boolean;
	loadingLabel?: string;
	mutation?: UseMutationResult<any, any, any, any>;
}

export default function SubmitButton({
	loading = false,
	label = 'Submit',
	loadingLabel = 'Đang xử lý...',
	mutation,
	disabled,
	...props
}: SubmitButtonProps) {
	const form = useFormContext();
	const isFormSubmitting = !!form?.formState?.isSubmitting;
	const isMutating = !!mutation?.isPending;
	const isLoading = isFormSubmitting || isMutating || !!loading;
	return (
		<Button type="submit" className="w-full mt-1" disabled={disabled || loading} aria-busy={isLoading} {...props}>
			{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
			{isLoading ? loadingLabel : label}
		</Button>
	);
}
