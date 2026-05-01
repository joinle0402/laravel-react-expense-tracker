import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Tooltip from '@mui/material/Tooltip';
import type { Category } from '@/features/category/types/category.type.ts';

interface CategoryTableRowProps {
	index: number;
	category: Category;
	onDelete: (category: Category) => void;
	onEdit: (category: Category) => void;
}

export default function CategoryTableRow({ index, category, onDelete, onEdit }: CategoryTableRowProps) {
	return (
		<TableRow hover sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' }, '&:last-child td': { borderBottom: 0 } }}>
			<TableCell>{index + 1}</TableCell>
			<TableCell>
				<Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
					<Avatar
						sx={{
							width: 24,
							height: 24,
							bgcolor: category.type === 'income' ? 'success.light' : 'error.light',
							color: 'white',
						}}
					>
						{category.type === 'income' ? <TrendingUpIcon fontSize="small" /> : <ReceiptLongIcon fontSize="small" />}
					</Avatar>
					<Typography sx={{ fontWeight: 600 }}>{category.name}</Typography>
				</Stack>
			</TableCell>
			<TableCell>
				<Chip
					size="small"
					label={category.type === 'income' ? 'Thu nhập' : 'Chi tiêu'}
					color={category.type === 'income' ? 'success' : 'error'}
					variant="outlined"
				/>
			</TableCell>
			<TableCell>
				<Chip
					size="small"
					label={category.is_system ? 'Hệ thống' : 'Cá nhân'}
					color={category.is_system ? 'default' : 'primary'}
					variant={category.is_system ? 'outlined' : 'filled'}
				/>
			</TableCell>
			<TableCell>
				<Chip
					size="small"
					label={category.is_deleted ? 'Đã xóa' : 'Hoạt động'}
					color={category.is_deleted ? 'error' : 'success'}
					sx={{
						height: 24,
						fontWeight: 600,
						bgcolor: category.is_deleted ? 'error.50' : 'success.50',
						color: category.is_deleted ? 'error.700' : 'success.700',
					}}
				/>
			</TableCell>
			<TableCell align="right">
				<Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
					<Tooltip title="Sửa danh mục" onClick={() => onEdit(category)}>
						<IconButton size="small" color="primary">
							<EditIcon fontSize="small" />
						</IconButton>
					</Tooltip>

					<Tooltip title={category.is_system ? 'Không thể xóa danh mục hệ thống' : 'Xóa danh mục'}>
						<span>
							<IconButton size="small" color="error" disabled={category.is_system} onClick={() => onDelete(category)}>
								<DeleteIcon fontSize="small" />
							</IconButton>
						</span>
					</Tooltip>
				</Stack>
			</TableCell>
		</TableRow>
	);
}
