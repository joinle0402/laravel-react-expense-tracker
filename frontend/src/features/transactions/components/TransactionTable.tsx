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
import TableContainer from '@mui/material/TableContainer';

interface CategoryTableProps {
	view: Transaction[];
	onDelete: (transaction: Transaction) => void;
}

const tableHeadCellStyle = {
	bgcolor: '#F8FAFC',
	fontWeight: 700,
	fontSize: 12,
	color: 'text.secondary',
	textTransform: 'uppercase',
	whiteSpace: 'nowrap',
};

export default function TransactionTable({ view, onDelete }: CategoryTableProps) {
	return (
		<TableContainer
			sx={{ height: '100%', border: 1, borderColor: 'divider', borderRadius: 1, overflow: 'auto', maxHeight: 'calc(100vh - 370px)' }}
		>
			<Table stickyHeader size="small">
				<TableHead>
					<TableRow sx={{ bgcolor: 'grey.50' }}>
						<TableCell sx={tableHeadCellStyle}>#</TableCell>
						<TableCell sx={tableHeadCellStyle}>Ngày giao dịch</TableCell>
						<TableCell sx={tableHeadCellStyle}>Loại giao dịch</TableCell>
						<TableCell sx={tableHeadCellStyle}>Danh mục</TableCell>
						<TableCell align="right" sx={tableHeadCellStyle}>
							Số tiền
						</TableCell>
						<TableCell sx={tableHeadCellStyle}>Ghi chú</TableCell>
						<TableCell sx={tableHeadCellStyle}>Ngày tạo</TableCell>
						<TableCell align="right" sx={tableHeadCellStyle}>
							Hành động
						</TableCell>
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
							<TableRow
								key={item.id}
								hover
								sx={{
									'&:last-child td': {
										borderBottom: 0,
									},
								}}
							>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{formatDate(item.dated)}</TableCell>
								<TableCell>
									<Chip
										label={item.type === 'income' ? 'Thu nhập' : 'Chi tiêu'}
										color={item.type === 'income' ? 'success' : 'error'}
										size="small"
										variant="filled"
										sx={{ fontWeight: 600 }}
									/>
								</TableCell>
								<TableCell>{item.category?.name || '-'}</TableCell>
								<TableCell align="right">
									<Typography sx={{ fontWeight: 600, color: item.type === 'income' ? 'success.main' : 'error.main' }}>
										{item.type === 'income' ? '+' : '-'}
										{formatCurrency(item.amount)}
									</Typography>
								</TableCell>
								<TableCell>
									<Typography
										variant="body2"
										sx={{
											maxWidth: 220,
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
										}}
										title={item.note}
									>
										{item.note || '-'}
									</Typography>
								</TableCell>
								<TableCell>{formatDate(item.created_at)}</TableCell>
								<TableCell align="right">
									<Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
										<Tooltip title="Sửa">
											<IconButton size="small" color="primary">
												<EditIcon fontSize="small" />
											</IconButton>
										</Tooltip>
										<Tooltip title="Xoá">
											<IconButton size="small" color="error" onClick={() => onDelete(item)}>
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
		</TableContainer>
	);
}
