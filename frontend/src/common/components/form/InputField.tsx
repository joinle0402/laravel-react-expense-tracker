import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form';
import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';

type InputFieldProps<T extends FieldValues> = {
	name: Path<T>;
	control: Control<T>;
} & Omit<TextFieldProps, 'name' | 'defaultValue'>;

export default function InputField<T extends FieldValues>({ name, control, ...props }: InputFieldProps<T>) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<TextField
					{...field}
					{...props}
					size={props.size || 'small'}
					fullWidth={props.fullWidth ?? true}
					error={!!fieldState.error}
					helperText={fieldState.error?.message || props.helperText}
					sx={{
						'& .MuiInputLabel-root.Mui-error': {
							color: 'error.main',
						},
						'& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
							borderColor: 'error.main',
						},
						'& .MuiOutlinedInput-input': {
							color: fieldState.error ? 'error.main' : 'inherit',
						},
					}}
				/>
			)}
		/>
	);
}
