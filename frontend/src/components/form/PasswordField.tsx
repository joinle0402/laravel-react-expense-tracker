import { useFormContext } from 'react-hook-form';
import { Field, FieldLabel } from '@/components/ui/field.tsx';
import { Input } from '@/components/ui/input.tsx';
import { type ComponentProps, useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils.ts';

type PasswordFieldProps = {
	id: string;
	name?: string;
	label: string;
} & ComponentProps<'input'>;

export default function PasswordField({ id, name, label, ...props }: PasswordFieldProps) {
	const [show, setShow] = useState(false);
	const { register, formState } = useFormContext();
	const { errors } = formState;
	const fieldName = name ?? id;
	const hasError = Boolean(errors[fieldName]);

	return (
		<Field className="gap-2">
			<FieldLabel htmlFor={id}>{label}</FieldLabel>
			<div className="relative">
				<Input
					id={id}
					type={show ? 'text' : 'password'}
					autoComplete="current-password"
					{...register(fieldName)}
					{...props}
					aria-invalid={hasError}
					className={cn(
						'peer pr-10',
						hasError && [
							'border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400',
							'text-red-600 placeholder:text-red-400 focus:placeholder:text-red-400'
						]
					)}
				/>
				<Button
					size="icon"
					type="button"
					className={cn(
						'absolute inset-y-0 right-2 my-auto flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent',
						hasError && 'text-red-600'
					)}
					onClick={() => setShow(show => !show)}
				>
					{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
				</Button>
			</div>
			{hasError && <p className="text-sm text-red-500">{String(errors[fieldName]?.message)}</p>}
		</Field>
	);
}
