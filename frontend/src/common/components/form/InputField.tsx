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
						'& input:-webkit-autofill': {
							WebkitTextFillColor: fieldState.error ? '#d32f2f' : 'inherit',
							WebkitBoxShadow: '0 0 0 1000px transparent inset',
							transition: 'background-color 5000s ease-in-out 0s',
						},
						'& input:-webkit-autofill:hover': {
							WebkitTextFillColor: fieldState.error ? '#d32f2f' : 'inherit',
						},
						'& input:-webkit-autofill:focus': {
							WebkitTextFillColor: fieldState.error ? '#d32f2f' : 'inherit',
						},
					}}
				/>
			)}
		/>
	);
}
