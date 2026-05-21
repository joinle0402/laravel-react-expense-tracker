import { Fragment } from 'react';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import BaseDatePicker from '@/common/components/form-controls/BaseDatePicker.tsx';
import type { DatePickerProps } from '@mui/x-date-pickers';

type DateFieldProps<TFieldValues extends FieldValues> = Omit<DatePickerProps, 'name'> & {
	name: FieldPath<TFieldValues>;
	control: Control<TFieldValues>;
};

export default function DateField<TFieldValues extends FieldValues>({ name, control, ...props }: DateFieldProps<TFieldValues>) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Fragment>
					<BaseDatePicker
						{...props}
						value={field.value}
						onChange={field.onChange}
						slotProps={{
							textField: {
								fullWidth: true,
								size: 'small',
								error: !!fieldState.error,
								helperText: fieldState.error?.message,
							},
						}}
					/>
				</Fragment>
			)}
		/>
	);
}
