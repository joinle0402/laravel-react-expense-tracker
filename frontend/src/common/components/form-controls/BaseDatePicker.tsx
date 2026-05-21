import { useState } from 'react';
import { DatePicker, type DatePickerProps } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

type BaseDatePickerProps = Omit<DatePickerProps, 'value' | 'onChange'> & {
	value?: string | null;
	onChange?: (value: string | null) => void;
};

export default function BaseDatePicker({ value, onChange, slotProps, ...props }: BaseDatePickerProps) {
	const [open, setOpen] = useState(false);

	return (
		<DatePicker
			{...props}
			format="DD/MM/YYYY"
			open={open}
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
			value={value ? dayjs(value) : null}
			onChange={date => onChange?.(date ? date.format('YYYY-MM-DD') : null)}
			slotProps={{
				...slotProps,
				textField: {
					size: 'small',
					onClick: () => setOpen(true),
					...slotProps?.textField,
				},
			}}
		/>
	);
}
