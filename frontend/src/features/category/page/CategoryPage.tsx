import { useState } from 'react';
import type { Category, CategoryTab } from '@/features/category/types/category.type';
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
import { useConfirmDialog } from '@/common/hooks/useConfirmDialog.ts';
import { useCategories } from '@/features/category/hooks/useCategories.ts';
import Tooltip from '@mui/material/Tooltip';
import useDebounce from '@/common/hooks/useDebounce.ts';
import CircularProgress from '@mui/material/CircularProgress';
import LoaddingRow from '@/common/components/table/LoaddingRow.tsx';
import EmptyRow from '@/common/components/table/EmptyRow.tsx';

export default function CategoryPage() {
	const [tab, setTab] = useState<CategoryTab>('all');
	const [search, setSearch] = useState<string>('');
	const debouncedSearch = useDebounce(search);
	const { deleteConfirm } = useConfirmDialog();
	const { data: response, isLoading, isFetching } = useCategories({ tab, search: debouncedSearch.trim() });
	const counts = response?.meta?.counts;
	const tabs = [
		{ value: 'all', label: 'Tất cả' },
		{ value: 'expense', label: 'Chi tiêu' },
		{ value: 'income', label: 'Thu nhập' },
		{ value: 'deleted', label: 'Đã xóa' },
	] as const;

	const handleDeleteCategory = async (category: Category) => {
		const confirmed = await deleteConfirm({
			title: `Xóa danh mục "${category.name}"?`,
			warning: 'Danh mục này sẽ không còn xuất hiện khi tạo giao dịch mới. Các giao dịch cũ dùng danh mục này vẫn được giữ nguyên.',
			message: 'Hành động này chỉ đánh dấu danh mục là đã xóa, không xóa giao dịch cũ.',
			maxWidth: 'sm',
		});
		console.log('-', confirmed);
	};

	return (
		<Box sx={{ p: 1 }}>
			<Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
				<Box>
					<Typography variant="h5" sx={{ fontWeight: 700 }}>
						Quản lý danh mục
					</Typography>

					<Typography variant="body2" color="text.secondary">
						Tạo và quản lý danh mục thu nhập, chi tiêu của bạn.
					</Typography>
				</Box>
			</Stack>

			<Paper sx={{ p: 2, borderRadius: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
				<Grid container spacing={2} sx={{ alignItems: 'center' }}>
					<Grid size={6}>
						<Tabs value={tab} onChange={(_, value) => setTab(value)} sx={{ mb: 2 }}>
							{tabs.map(item => (
								<Tab
									key={item.value}
									value={item.value}
									label={
										<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
											<Typography variant="body2" sx={{ fontWeight: 600 }}>
												{item.label}
											</Typography>
											{counts && (
												<Typography
													variant="caption"
													sx={{
														px: 0.75,
														py: 0.15,
														borderRadius: 10,
														bgcolor: 'action.hover',
														color: 'text.secondary',
														fontWeight: 600,
														lineHeight: 1.4,
													}}
												>
													{counts[item.value] || 0}
												</Typography>
											)}
										</Box>
									}
								/>
							))}
						</Tabs>
					</Grid>
					<Grid size={6}>
						<Stack direction="row" spacing={1} sx={{ alignItems: 'center', minHeight: 40 }}>
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
										endAdornment: isFetching ? (
											<InputAdornment position="end">
												<CircularProgress size={18} />
											</InputAdornment>
										) : null,
									},
								}}
								sx={{ flex: 1, minWidth: 260 }}
							/>
							<Button variant="contained" startIcon={<AddIcon />} sx={{ minHeight: 40 }}>
								Tạo danh mục
							</Button>
						</Stack>
					</Grid>
				</Grid>
				<Grid container>
					<Grid size={12}>
						<TableContainer component={Paper} variant="elevation" sx={{ maxHeight: 'calc(100vh - 360px)' }}>
							<Table stickyHeader>
								<TableHead>
									<TableRow>
										<TableCell
											sx={{
												bgcolor: '#F8FAFC',
												fontWeight: 700,
												fontSize: 12,
												color: 'text.secondary',
												textTransform: 'uppercase',
												minWidth: '10px',
											}}
										>
											#
										</TableCell>
										<TableCell
											sx={{
												bgcolor: '#F8FAFC',
												fontWeight: 700,
												fontSize: 12,
												color: 'text.secondary',
												textTransform: 'uppercase',
												minWidth: '35%',
											}}
										>
											Tên danh mục
										</TableCell>
										<TableCell
											sx={{
												bgcolor: '#F8FAFC',
												fontWeight: 700,
												fontSize: 12,
												color: 'text.secondary',
												textTransform: 'uppercase',
												minWidth: '160px',
											}}
										>
											Loại{' '}
										</TableCell>
										<TableCell
											sx={{
												bgcolor: '#F8FAFC',
												fontWeight: 700,
												fontSize: 12,
												color: 'text.secondary',
												textTransform: 'uppercase',
												minWidth: '160px',
											}}
										>
											Nguồn
										</TableCell>
										<TableCell
											sx={{
												bgcolor: '#F8FAFC',
												fontWeight: 700,
												fontSize: 12,
												color: 'text.secondary',
												textTransform: 'uppercase',
												minWidth: '160px',
											}}
										>
											Trạng thái
										</TableCell>
										<TableCell
											sx={{
												bgcolor: '#F8FAFC',
												fontWeight: 700,
												fontSize: 12,
												color: 'text.secondary',
												textTransform: 'uppercase',
												minWidth: '100px',
											}}
											align="right"
										>
											Hành động
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{isLoading ? (
										<LoaddingRow colSpan={6} />
									) : response?.data?.length == 0 ? (
										<EmptyRow colSpan={6} search={debouncedSearch} />
									) : (
										response?.data?.map((category: Category, index: number) => (
											<TableRow
												hover
												key={index}
												sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' }, '&:last-child td': { borderBottom: 0 } }}
											>
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
														color={category.is_deleted ? 'default' : 'success'}
														sx={{
															height: 24,
															fontWeight: 600,
															bgcolor: category.is_deleted ? 'default' : 'success.50',
															color: category.is_deleted ? 'default' : 'success.700',
														}}
													/>
												</TableCell>
												<TableCell align="right">
													<Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
														<Tooltip title="Sửa danh mục">
															<IconButton size="small" color="primary">
																<EditIcon fontSize="small" />
															</IconButton>
														</Tooltip>

														<Tooltip title={category.is_system ? 'Không thể xóa danh mục hệ thống' : 'Xóa danh mục'}>
															<span>
																<IconButton
																	size="small"
																	color="error"
																	disabled={category.is_system}
																	onClick={() => handleDeleteCategory(category)}
																>
																	<DeleteIcon fontSize="small" />
																</IconButton>
															</span>
														</Tooltip>
													</Stack>
												</TableCell>
											</TableRow>
										))
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
}
