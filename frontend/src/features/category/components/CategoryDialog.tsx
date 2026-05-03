import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { handleApiError } from '@/common/utils/handle-api-error.ts';
import type { Category, CategoryFormValues } from '@/features/category/types/category.type.ts';
import useCreateCategory from '@/features/category/hooks/useCreateCategory.ts';
import useUpdateCategory from '@/features/category/hooks/useUpdateCategory.ts';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InputField from '@/common/components/form/InputField.tsx';
import OptionToggleField from '@/common/components/form/OptionToggleField.tsx';

const Schema = z.object({
	name: z.string().trim().min(1, 'Vui lòng nhập tên danh mục').max(100, 'Tên danh mục không được vượt quá 100 ký tự').default(''),
	type: z.enum(['expense', 'income'], { message: 'Vui lòng chọn loại danh mục' }).default('expense'),
});

type FormValues = z.infer<typeof Schema>;

type DialogMode = 'create' | 'update';

interface CategoryDialogProps {
	open: boolean;
	mode: DialogMode;
	initialValues?: CategoryFormValues | null;
	lockType?: boolean;
	onClose: () => void;
	onConfirm?: (category: Category) => void;
}

export default function CategoryDialog({ open, lockType = false, mode, onClose, onConfirm, initialValues }: CategoryDialogProps) {
	const isEdit = mode === 'update';
	const formValues = Schema.parse(initialValues ?? {});
	const {
		control,
		reset,
		setError,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm({
		resolver: zodResolver(Schema),
		defaultValues: Schema.parse({}),
		values: formValues,
	});
	const { mutateAsync: create, isPending: isCreating } = useCreateCategory();
	const { mutateAsync: update, isPending: isUpdating } = useUpdateCategory();
	const isLoading = isCreating || isUpdating || isSubmitting;

	const onSubmit = async (formValues: FormValues) => {
		try {
			const response = await (isEdit ? update({ ...formValues, id: initialValues?.id }) : create(formValues));
			reset();
			onClose();
			onConfirm?.(response.data);
		} catch (error) {
			handleApiError({ error, setError });
		}
	};

	const handleDialogClose = () => {
		if (isLoading) return;
		reset();
		onClose();
	};

	return (
		<Dialog open={open} onClose={handleDialogClose} fullWidth maxWidth="sm">
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<DialogTitle>{isEdit ? 'Cập nhật danh mục' : 'Thêm danh mục mới'}</DialogTitle>
				<DialogContent sx={{ p: '16px 24px!important' }}>
					<Stack spacing={2}>
						<InputField
							autoFocus
							control={control}
							disabled={isLoading}
							name="name"
							label="Tên danh mục"
							placeholder="Ví dụ: Ăn uống, Lương, Mua sắm..."
						/>
						<OptionToggleField
							control={control}
							disabled={isLoading || lockType}
							name="type"
							options={[
								{
									label: 'Chi tiêu',
									value: 'expense',
								},
								{
									label: 'Thu nhập',
									value: 'income',
								},
							]}
						/>
						{lockType && (
							<Typography variant="caption" color="text.secondary">
								Không thể thay đổi loại danh mục vì danh mục này đã được sử dụng trong giao dịch.
							</Typography>
						)}
					</Stack>
				</DialogContent>
				<DialogActions sx={{ px: 3 }}>
					<Button onClick={handleDialogClose} disabled={isLoading}>
						Hủy
					</Button>

					<Button
						type="submit"
						variant="contained"
						loading={isLoading}
						loadingIndicator={isEdit ? 'Đang lưu...' : 'Đang thêm...'}
						sx={{
							minWidth: isEdit ? 150 : 150,
							whiteSpace: 'nowrap',
						}}
					>
						{isEdit ? 'Lưu thay đổi' : 'Thêm danh mục'}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
