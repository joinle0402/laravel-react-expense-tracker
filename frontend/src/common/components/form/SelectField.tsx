import type { Control, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, type SelectProps } from '@mui/material';

export type SelectOption<TValue extends string | number = string> = {
	label: string;
	value: TValue;
};

type SelectFieldProps<TFieldValues extends FieldValues, TValue extends string | number = string> = Omit<
	SelectProps,
	'name' | 'value' | 'onChange' | 'label'
> & {
	name: Path<TFieldValues>;
	control: Control<TFieldValues>;
	label: string;
	options: SelectOption<TValue>[];
};

export default function SelectField<TFieldValues extends FieldValues, TValue extends string | number = string>({
	name,
	control,
	label,
	options,
	disabled,
	fullWidth = true,
	size = 'small',
	...props
}: SelectFieldProps<TFieldValues, TValue>) {
	const labelId = `${name}-label`;

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<FormControl fullWidth={fullWidth} size={size} error={!!fieldState.error} disabled={disabled}>
					<InputLabel id={labelId}>{label}</InputLabel>

					<Select {...field} {...props} labelId={labelId} label={label} value={field.value ?? ''}>
						{options.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</Select>

					{fieldState.error?.message && <FormHelperText>{fieldState.error.message}</FormHelperText>}
				</FormControl>
			)}
		/>
	);
}
