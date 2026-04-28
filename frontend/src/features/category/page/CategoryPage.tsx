import { useState } from 'react';
import type { CategoryTab } from '@/features/category/types/category.type';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

export default function CategoryPage() {
	const [tab, setTab] = useState<CategoryTab>('all');
	const [search, setSearch] = useState<string>('');
	const [formMode, setFormMode] = useState<string>('create');
	const [openForm, setOpenForm] = useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

	const categories = [
		{ name: 'Ăn uống', type: 'income', is_system: false, is_deleted: false },
		{ name: 'Giáo dục', type: 'expense', is_system: true, is_deleted: false },
		{ name: 'Giải trí', type: 'expense', is_system: true, is_deleted: false },
		{ name: 'Giáo dục', type: 'income', is_system: false, is_deleted: false },
		{ name: 'Tiền lương', type: 'income', is_system: true, is_deleted: false },
		{ name: 'Tiền thưởng', type: 'expense', is_system: true, is_deleted: false },
	];
	const filtered = categories.filter(category => {
		const matchesSearch = category.name.toLowerCase().includes(search.toLowerCase());

		if (!matchesSearch) return false;

		if (tab === 'deleted') {
			return category.is_deleted;
		}

		if (tab === 'income') {
			return category.type === 'income' && !category.is_deleted;
		}

		if (tab === 'expense') {
			return category.type === 'expense' && !category.is_deleted;
		}

		return !category.is_deleted;
	});

	const handleOpenForm = () => {
		setOpenForm(true);
	};

	const handleCloseForm = () => {
		setOpenForm(false);
	};

	const handleOpenDeleteForm = () => {
		setOpenDeleteDialog(true);
	};

	const handleCloseDeleteForm = () => {
		setOpenDeleteDialog(false);
	};

	return (
		<Box sx={{ p: 1 }}>
			<Stack
				direction="row"
				spacing={2}
				sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 3 }}
			>
				<Box>
					<Typography variant="h5" sx={{ fontWeight: 700 }}>
						Quản lý danh mục
					</Typography>

					<Typography variant="body2" color="text.secondary">
						Tạo và quản lý danh mục thu nhập, chi tiêu của bạn.
					</Typography>
				</Box>

				<Button variant="contained" onClick={handleOpenForm} startIcon={<AddIcon />}>
					Tạo danh mục
				</Button>
			</Stack>

			<Tabs value={tab} onChange={(_, value) => setTab(value)} sx={{ mb: 2 }}>
				<Tab label="Tất cả" value="all" />
				<Tab label="Chi tiêu" value="expense" />
				<Tab label="Thu nhập" value="income" />
				<Tab label="Đã xóa" value="deleted" />
			</Tabs>

			<Grid container spacing={2}>
				<Grid size={4}>
					<TextField
						fullWidth
						size="small"
						placeholder="Tìm kiếm danh mục..."
						value={search}
						onChange={e => setSearch(e.target.value)}
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon fontSize="small" />
									</InputAdornment>
								),
							},
						}}
						sx={{ mb: 2 }}
					/>
				</Grid>
			</Grid>
			<Grid container>
				<Grid size={12}>
					<TableContainer component={Paper} variant='elevation'>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell sx={{ fontWeight: 700, textTransform: 'uppercase' }}>#</TableCell>
									<TableCell sx={{ fontWeight: 700, textTransform: 'uppercase' }}>Tên danh mục</TableCell>
									<TableCell sx={{ fontWeight: 700, textTransform: 'uppercase' }}>Loại </TableCell>
									<TableCell sx={{ fontWeight: 700, textTransform: 'uppercase' }}>Nguồn</TableCell>
									<TableCell sx={{ fontWeight: 700, textTransform: 'uppercase' }}>Trạng thái</TableCell>
									<TableCell sx={{ fontWeight: 700, textTransform: 'uppercase' }} align="right">Hành động</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{filtered.map((category, index) => (
									<TableRow key={index}>
										<TableCell>{index + 1}</TableCell>
										<TableCell>
											<Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
												<Avatar
													sx={{
														width: 36,
														height: 36,
														bgcolor: category.type === 'income' ? 'success.light' : 'error.light',
														color: 'white',
													}}
												>
													{category.type === 'income' ? (
														<TrendingUpIcon fontSize="small" />
													) : (
														<ReceiptLongIcon fontSize="small" />
													)}
												</Avatar>
												<Typography sx={{ fontWeight: 600 }}>
													{category.name}
												</Typography>
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
												color={category.is_deleted ? 'default' : 'success'}
											/>
										</TableCell>
										<TableCell align="right">
											<Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
												<IconButton size="small" color="primary">
													<EditIcon fontSize="small" />
												</IconButton>

												<IconButton size="small" color="error">
													<DeleteIcon fontSize="small" />
												</IconButton>
											</Stack>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>

			<Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="sm">
				<DialogTitle>
					{formMode === 'create' ? 'Tạo danh mục' : 'Sửa danh mục'}
				</DialogTitle>
			</Dialog>
			
			<Dialog open={openDeleteDialog} onClose={handleCloseForm} fullWidth maxWidth="sm">

			</Dialog>
		</Box>
	);
}
