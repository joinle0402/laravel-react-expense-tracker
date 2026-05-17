import type { Transaction } from '@/features/transactions/types/transaction.type.ts';
import { formatCurrency, formatDate } from '@/common/utils/format.ts';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

interface CategoryTableProps {
	view: Transaction[];
}

export default function TransactionTable({ view }: CategoryTableProps) {
	return (
		<Table>
			<TableHead>
				<TableRow>
					<TableCell>#</TableCell>
					<TableCell>Ngày</TableCell>
					<TableCell>Loại</TableCell>
					<TableCell>Danh mục</TableCell>
					<TableCell align="right">Số tiền</TableCell>
					<TableCell>Ghi chú</TableCell>
					<TableCell>Ngày tạo</TableCell>
					<TableCell align="right">Hành động</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{view.length === 0 ? (
					<TableRow>
						<TableCell colSpan={8}>
							<Box sx={{ textAlign: 'center', py: 6 }}>
								<Typography variant="h6">Chưa có giao dịch nào</Typography>

								<Typography color="text.secondary" sx={{ mt: 1 }}>
									Hãy thêm giao dịch đầu tiên để bắt đầu quản lý thu chi.
								</Typography>

								<Button variant="contained" sx={{ mt: 2 }}>
									Thêm giao dịch
								</Button>
							</Box>
						</TableCell>
					</TableRow>
				) : (
					view.map((item, index) => (
						<TableRow key={item.id}>
							<TableCell>{index + 1}</TableCell>
							<TableCell>{formatDate(item.dated)}</TableCell>
							<TableCell>
								<Chip
									label={item.type === 'income' ? 'Thu nhập' : 'Chi tiêu'}
									color={item.type === 'income' ? 'success' : 'error'}
									size="small"
								/>
							</TableCell>
							<TableCell>{item.category?.name || '-'}</TableCell>
							<TableCell align="right">
								<Typography sx={{ fontWeight: 600, color: item.type === 'income' ? 'success.main' : 'error.main' }}>
									{item.type === 'income' ? '+' : '-'}
									{formatCurrency(item.amount)}
								</Typography>
							</TableCell>
							<TableCell>{item.note || '-'}</TableCell>
							<TableCell>{formatDate(item.created_at)}</TableCell>
							<TableCell align="right">
								<Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
									<Tooltip title="Sửa">
										<IconButton size="small" color="primary">
											<EditIcon fontSize="small" />
										</IconButton>
									</Tooltip>
									<Tooltip title="Sửa">
										<IconButton size="small" color="error">
											<DeleteIcon fontSize="small" />
										</IconButton>
									</Tooltip>
								</Stack>
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
