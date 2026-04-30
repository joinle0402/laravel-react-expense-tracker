import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SearchOffIcon from '@mui/icons-material/SearchOff';

interface EmptyRowProps {
	colSpan: number;
	search?: string;
	title?: string;
	description?: string;
}

export default function EmptyRow({ colSpan, search, title = 'Không có dữ liệu', description }: EmptyRowProps) {
	return (
		<TableRow>
			<TableCell colSpan={colSpan} align="center">
				<Box sx={{ py: 6, gap: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<SearchOffIcon sx={{ fontSize: 32, color: 'text.disabled' }} />
					<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
						{title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{description ?? (search ? `Không tìm thấy dữ liệu phù hợp với “${search}”.` : 'Hiện chưa có dữ liệu để hiển thị.')}
					</Typography>
				</Box>
			</TableCell>
		</TableRow>
	);
}
