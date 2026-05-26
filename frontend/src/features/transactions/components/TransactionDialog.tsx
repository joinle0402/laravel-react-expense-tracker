import { z } from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCategoryOptions } from '@/features/category/hooks/useCategoryOptions.ts';
import { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import OptionToggleField from '@/common/components/form/OptionToggleField.tsx';
import AutocompleteField from '@/common/components/form/AutocompleteField.tsx';
import PriceField from '@/common/components/form/PriceField.tsx';
import DateField from '@/common/components/form/DatePicker.tsx';
import { getCurrentDate } from '@/common/utils/date.ts';
import InputField from '@/common/components/form/InputField.tsx';
import { handleApiError } from '@/common/utils/handle-api-error.ts';
import useCreateTransaction from '@/features/transactions/hooks/useCreateTransaction.ts';

const Schema = z.object({
	type: z.enum(['expense', 'income'], { message: 'Vui lòng chọn loại danh mục' }),
	category_id: z
		.number({ message: 'Vui lòng chọn danh mục' })
		.nullable()
		.refine((value): value is number => value !== null, {
			message: 'Vui lòng chọn danh mục',
		}),
	amount: z.coerce.number({ message: 'Vui lòng nhập số tiền' }).positive('Số tiền phải lớn hơn 0'),
	dated: z.string({ message: 'Vui lòng chọn ngày giao dịch' }).min(1, 'Vui lòng chọn ngày giao dịch'),
	note: z.string(),
});

type FormValues = z.infer<typeof Schema>;

interface TransactionDialogProps {
	open: boolean;
	mode: 'create' | 'update';
	initialValues?: FormValues;
	onClose: () => void;
}

const TRANSACTION_TYPE_OPTIONS = [
	{ label: 'Chi tiêu', value: 'expense' },
	{ label: 'Thu nhập', value: 'income' },
];

export default function TransactionDialog({ open = true, mode, onClose }: TransactionDialogProps) {
	const isEdit = mode === 'update';
	const { control, setValue, handleSubmit, formState, setError, reset } = useForm({
		resolver: zodResolver(Schema),
		defaultValues: { type: 'expense', category_id: null, amount: null, dated: getCurrentDate(), note: '' },
	});
	const { isSubmitting } = formState;
	const { mutateAsync: create, isPending: isCreating } = useCreateTransaction();

	const type = useWatch({ control, name: 'type' });
	const { data: categories = [], isLoading } = useCategoryOptions(type, { enabled: open });
	const categoryOptions = categories.map(item => ({ value: item.id, label: item.name }));
	const isSubmitted = isCreating || isSubmitting;

	useEffect(() => setValue('category_id', null), [type, setValue]);

	const onSubmit = async (values: FormValues) => {
		try {
			await create(values);
			reset();
			onClose();
		} catch (error) {
			handleApiError({ error, setError });
		}
	};

	return (
		<Dialog open={open} maxWidth="sm" onClose={onClose} fullWidth>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<DialogTitle align="center">{isEdit ? 'Cập nhật giao dịch' : 'Thêm giao dịch'}</DialogTitle>
				<DialogContent>
					<Stack spacing={2} sx={{ mt: 1 }}>
						<OptionToggleField control={control} name="type" options={TRANSACTION_TYPE_OPTIONS} />
						<AutocompleteField control={control} name="category_id" label="Danh mục" loading={isLoading} options={categoryOptions} />
						<PriceField control={control} name="amount" label="Số tiền" />
						<DateField control={control} name="dated" label="Ngày giao dịch" />
						<InputField
							control={control}
							name="note"
							multiline
							rows={3}
							label="Ghi chú"
							placeholder="Ví dụ: Ăn trưa, mua đồ, nhận lương..."
						/>
					</Stack>
				</DialogContent>
				<DialogActions sx={{ px: 3 }}>
					<Button onClick={onClose}>Huỷ</Button>
					<Button
						type="submit"
						variant="contained"
						loading={isSubmitted}
						loadingIndicator="Đang lưu..."
						sx={{
							minWidth: 120,
							whiteSpace: 'nowrap',
							'& .MuiButton-loadingIndicator': {
								whiteSpace: 'nowrap',
							},
						}}
					>
						{isEdit ? 'Cập nhật' : 'Thêm mới'}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
