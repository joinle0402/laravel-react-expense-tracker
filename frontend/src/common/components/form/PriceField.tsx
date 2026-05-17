import TextField, { type TextFieldProps } from '@mui/material/TextField';
import { type Control, Controller, type FieldPath, type FieldValues } from 'react-hook-form';
import { parseCurrency } from '@/common/utils/format.ts';
import InputAdornment from '@mui/material/InputAdornment';

type PriceFieldProps<T extends FieldValues> = Omit<TextFieldProps, 'name' | 'value' | 'onChange'> & {
	name: FieldPath<T>;
	control: Control<T>;
};

export default function PriceField<T extends FieldValues>({ name, control, ...props }: PriceFieldProps<T>) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<TextField
					{...props}
					label={props.label}
					size={props.size || 'small'}
					fullWidth
					value={new Intl.NumberFormat('vi-VN').format(field.value || 0)}
					onChange={event => field.onChange(parseCurrency(event.target.value))}
					onBlur={field.onBlur}
					onFocus={event => event.target.select()}
					error={!!fieldState.error}
					helperText={fieldState.error?.message}
					slotProps={{
						input: {
							inputMode: 'numeric',
							endAdornment: <InputAdornment position="end">₫</InputAdornment>,
						},
					}}
					sx={{
						'& .MuiInputLabel-root.Mui-error': {
							color: 'error.main',
						},
						'& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
							borderColor: 'error.main',
						},
						'& .MuiOutlinedInput-input': {
							color: fieldState.error ? 'error.main' : 'inherit',
							textAlign: 'right',
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
						'& .MuiInputAdornment-root .MuiTypography-root': {
							color: fieldState.error ? 'error.main' : 'inherit',
						},
					}}
				/>
			)}
		/>
	);
}
