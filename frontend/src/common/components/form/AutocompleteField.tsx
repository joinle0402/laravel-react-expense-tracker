import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export type AutocompleteOption = {
	label: string;
	value: string | number;
};

interface AutocompleteFieldProps<TFieldValues extends FieldValues> {
	name: FieldPath<TFieldValues>;
	control: Control<TFieldValues>;
	label: string;
	options: AutocompleteOption[];
	loading?: boolean;
	placeholder?: string;
	disabled?: boolean;
}

export default function AutocompleteField<TFieldValues extends FieldValues>({
	name,
	control,
	label,
	options,
	loading = false,
	placeholder,
	disabled = false,
}: AutocompleteFieldProps<TFieldValues>) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				const selectedOption = options.find(option => option.value === field.value) ?? null;

				return (
					<Autocomplete
						options={options}
						size="small"
						value={selectedOption}
						loading={loading}
						disabled={disabled}
						getOptionLabel={option => option.label}
						isOptionEqualToValue={(option, value) => option.value === value.value}
						onChange={(_, option) => {
							field.onChange(option?.value ?? null);
						}}
						onBlur={field.onBlur}
						renderInput={params => (
							<TextField
								{...params}
								label={label}
								placeholder={placeholder}
								error={!!fieldState.error}
								helperText={fieldState.error?.message}
								inputRef={field.ref}
							/>
						)}
					/>
				);
			}}
		/>
	);
}
