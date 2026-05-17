import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import dayjs from 'dayjs';

interface DateFieldProps<TFieldValues extends FieldValues> {
	name: FieldPath<TFieldValues>;
	control: Control<TFieldValues>;
	label: string;
	disabled?: boolean;
	maxDate?: string;
	minDate?: string;
}

export default function DateField<TFieldValues extends FieldValues>({
	name,
	control,
	label,
	disabled = false,
	minDate,
	maxDate,
}: DateFieldProps<TFieldValues>) {
	const [isOpenDatepicker, setIsOpenDatepicker] = useState(false);
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<DatePicker
					label={label}
					format="DD/MM/YYYY"
					open={isOpenDatepicker}
					onOpen={() => setIsOpenDatepicker(true)}
					onClose={() => setIsOpenDatepicker(false)}
					value={field.value ? dayjs(field.value) : null}
					disabled={disabled}
					minDate={minDate ? dayjs(minDate) : undefined}
					maxDate={maxDate ? dayjs(maxDate) : undefined}
					onChange={date => {
						field.onChange(date ? date.format('YYYY-MM-DD') : null);
					}}
					slotProps={{
						textField: {
							fullWidth: true,
							size: 'small',
							error: !!fieldState.error,
							helperText: fieldState.error?.message,
							inputRef: field.ref,
							onClick: () => setIsOpenDatepicker(true),
						},
					}}
				/>
			)}
		/>
	);
}
