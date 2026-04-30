import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

interface LoaddingRowProps {
	colSpan: number;
	text?: string;
}

export default function LoaddingRow({ colSpan, text = 'Đang tải dữ liệu...' }: LoaddingRowProps) {
	return (
		<TableRow>
			<TableCell colSpan={colSpan} align="center">
				<Box sx={{ py: 5 }}>
					<CircularProgress size={28} />
					<Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
						{text}
					</Typography>
				</Box>
			</TableCell>
		</TableRow>
	);
}
