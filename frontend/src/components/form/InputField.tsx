import { useFormContext } from 'react-hook-form';
import { Field, FieldLabel } from '@/components/ui/field.tsx';
import { Input } from '@/components/ui/input.tsx';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils.ts';

type InputFieldProps = {
	id: string;
	name?: string;
	label: string;
} & ComponentProps<'input'>;

export default function InputField({ id, name, label, ...props }: InputFieldProps) {
	const { register, formState } = useFormContext();
	const { errors } = formState;
	const fieldName = name ?? id;
	const hasError = Boolean(errors[fieldName]);

	return (
		<Field className="gap-2">
			<FieldLabel className={cn(hasError && 'text-red-500')} htmlFor={id}>
				{label}
			</FieldLabel>
			<Input
				id={id}
				{...register(fieldName)}
				{...props}
				aria-invalid={hasError}
				className={cn(
					'peer',
					hasError && [
						'border-red-600 focus-visible:border-red-600 focus-visible:ring-red-600',
						'text-red-600 placeholder:text-red-600 focus:placeholder:text-red-600',
						'focus:border-red-600'
					]
				)}
			/>
			{errors[fieldName] && <p className="text-sm text-red-500">{String(errors[fieldName].message)}</p>}
		</Field>
	);
}
