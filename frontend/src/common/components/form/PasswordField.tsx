import { useState } from 'react';
import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form';
import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type PasswordFieldProps<T extends FieldValues> = {
	name: Path<T>;
	control: Control<T>;
} & Omit<TextFieldProps, 'name' | 'defaultValue'>;

export default function PasswordField<T extends FieldValues>({ name, control, ...props }: PasswordFieldProps<T>) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<TextField
					{...field}
					{...props}
					autoComplete="new-password"
					type={showPassword ? 'text' : 'password'}
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
						'& .MuiOutlinedInput-root.Mui-error .MuiSvgIcon-root': {
							color: 'error.main',
						},
						'& .MuiOutlinedInput-input': {
							color: fieldState.error ? 'error.main' : 'inherit',
						},
					}}
					slotProps={{
						input: {
							endAdornment: (
								<InputAdornment position="end">
									<IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(e) => e.preventDefault()}>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						},
					}}
				/>
			)}
		/>
	);
}
