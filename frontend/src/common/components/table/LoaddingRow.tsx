import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import TableStateRow from '@/common/components/table/TableStateRow.tsx';

interface LoaddingRowProps {
	colSpan: number;
	text?: string;
}

export default function LoaddingRow({ colSpan, text = 'Đang tải dữ liệu...' }: LoaddingRowProps) {
	return (
		<TableStateRow colSpan={colSpan}>
			<CircularProgress size={28} />
			<Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
				{text}
			</Typography>
		</TableStateRow>
	);
}
