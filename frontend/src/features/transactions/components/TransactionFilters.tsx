import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import type { TransactionFiltersValue } from '@/features/transactions/types/transaction.type.ts';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import BaseDatePicker from '@/common/components/form-controls/BaseDatePicker.tsx';

type TransactionFiltersProps = {
	value: TransactionFiltersValue;
	onChange: (value: TransactionFiltersValue) => void;
	onReset: () => void;
};

export default function TransactionFilters({ value, onChange, onReset }: TransactionFiltersProps) {
	const handleChange = <K extends keyof TransactionFiltersValue>(key: K, nextValue: TransactionFiltersValue[K]) =>
		onChange({ ...value, [key]: nextValue });

	return (
		<Stack direction={{ xs: 'column', md: 'row' }} spacing={1} sx={{ alignItems: { xs: 'stretch', md: 'center' } }}>
			<TextField
				size="small"
				placeholder="Tìm kiếm ghi chú, danh mục..."
				fullWidth
				sx={{ maxWidth: 400 }}
				name="search"
				value={value.search}
				onChange={event => handleChange(event.target.name as keyof TransactionFiltersValue, event.target.value)}
			/>
			<TextField
				select
				name="type"
				size="small"
				label="Loại"
				defaultValue="all"
				sx={{ minWidth: { md: 160 } }}
				onChange={event => handleChange(event.target.name as keyof TransactionFiltersValue, event.target.value)}
			>
				<MenuItem value="all">Tất cả</MenuItem>
				<MenuItem value="income">Thu nhập</MenuItem>
				<MenuItem value="expense">Chi tiêu</MenuItem>
			</TextField>
			<BaseDatePicker
				label="Từ ngày"
				value={value.fromDate}
				maxDate={dayjs(value.toDate)}
				onChange={value => handleChange('fromDate', value)}
			/>
			<BaseDatePicker
				label="Đến ngày"
				value={value.toDate}
				minDate={dayjs(value.fromDate)}
				maxDate={dayjs()}
				onChange={value => handleChange('toDate', value)}
			/>
			<Button variant="outlined" onClick={onReset} sx={{ whiteSpace: 'nowrap' }}>
				Đặt lại
			</Button>
		</Stack>
	);
}
