import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlined';
import TableStateRow from '@/common/components/table/TableStateRow';

interface ErrorRowProps {
	colSpan: number;
	title?: string;
	description?: string;
	onRetry?: () => void;
}

export default function ErrorRow({ colSpan, title = 'Không thể tải dữ liệu', description = 'Vui lòng thử lại sau.', onRetry }: ErrorRowProps) {
	return (
		<TableStateRow colSpan={colSpan}>
			<ErrorOutlineIcon sx={{ fontSize: 32, color: 'error.main' }} />

			<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
				{title}
			</Typography>

			<Typography variant="body2" color="text.secondary">
				{description}
			</Typography>

			{onRetry && (
				<Button variant="outlined" size="small" sx={{ mt: 1 }} onClick={onRetry}>
					Thử lại
				</Button>
			)}
		</TableStateRow>
	);
}
