import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePagination from '@mui/material/TablePagination';
import LoaddingRow from '@/common/components/table/LoaddingRow.tsx';
import EmptyRow from '@/common/components/table/EmptyRow.tsx';
import type { Category } from '@/features/category/types/category.type.ts';
import CategoryTableRow from '@/features/category/components/CategoryTableRow.tsx';
import type { ChangeEvent, MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Checkbox } from '@mui/material';
import Button from '@mui/material/Button';

const tableHeadCellStyle = {
	bgcolor: '#F8FAFC',
	fontWeight: 700,
	fontSize: 12,
	color: 'text.secondary',
	textTransform: 'uppercase',
};

interface CategoryTableProps {
	totalItems: number;
	page: number;
	limit: number;
	isLoading: boolean;
	categories: Category[];
	search: string;
	selectedIds: number[];
	onPageChange: (_event: MouseEvent<HTMLButtonElement> | null, page: number) => void;
	onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onDelete: (category: Category) => void;
	onEdit: (category: Category) => void;
	onSelectOne: (id: number) => void;
	onSelectAll: (checked: boolean, ids: number[]) => void;
	onBulkDelete: () => void;
}

export default function CategoryTable({
	categories,
	totalItems,
	page,
	limit,
	selectedIds,
	onPageChange,
	onRowsPerPageChange,
	isLoading,
	search,
	onDelete,
	onEdit,
	onSelectOne,
	onSelectAll,
	onBulkDelete,
}: CategoryTableProps) {
	const from = totalItems === 0 ? 0 : page * limit + 1;
	const to = Math.min((page + 1) * limit, totalItems);

	const itemIds = categories.map(item => Number(item.id));
	const selectedCount = itemIds.filter(id => selectedIds.includes(id)).length;
	const isSelectedAll = categories.length > 0 && selectedCount === categories.length;
	const isIndeterminate = selectedCount > 0 && selectedCount < categories.length;

	return (
		<Grid container>
			<Grid size={12}>
				<Box
					sx={{
						mb: 1,
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					{selectedIds.length > 0 && (
						<Typography variant="body2" color="text.secondary">
							Đã chọn {selectedIds.length} danh mục
						</Typography>
					)}

					{selectedIds.length > 0 && (
						<Button
							variant="contained"
							color="error"
							size="small"
							startIcon={<DeleteIcon />}
							disabled={selectedIds.length === 0}
							onClick={onBulkDelete}
						>
							Xóa đã chọn
						</Button>
					)}
				</Box>
				<TableContainer component={Paper} variant="elevation" sx={{ maxHeight: 480 }}>
					<Table stickyHeader size="small">
						<TableHead>
							<TableRow>
								<TableCell sx={{ ...tableHeadCellStyle, width: 48 }}>
									<Checkbox
										size="small"
										checked={isSelectedAll}
										indeterminate={isIndeterminate}
										onChange={event => onSelectAll(event.target.checked, itemIds)}
									/>
								</TableCell>
								<TableCell sx={{ ...tableHeadCellStyle, minWidth: '10px' }}>#</TableCell>
								<TableCell sx={{ ...tableHeadCellStyle, minWidth: '35%' }}>Tên danh mục</TableCell>
								<TableCell sx={{ ...tableHeadCellStyle, minWidth: '160px' }}>Loại </TableCell>
								<TableCell sx={{ ...tableHeadCellStyle, minWidth: '100px' }} align="right">
									Hành động
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{isLoading ? (
								<LoaddingRow colSpan={6} />
							) : categories?.length == 0 ? (
								<EmptyRow colSpan={6} search={search} />
							) : (
								categories?.map((category: Category, index: number) => (
									<CategoryTableRow
										key={category.id}
										index={index}
										category={category}
										onDelete={onDelete}
										onEdit={onEdit}
										checked={selectedIds.includes(Number(category.id))}
										onSelect={() => onSelectOne(Number(category.id))}
									/>
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>

				<Box
					sx={{
						borderTop: '1px solid',
						borderColor: 'divider',
						bgcolor: 'background.paper',
						width: '100%',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Typography variant="body2">
						Hiển thị {from}–{to} trong {totalItems} danh mục
					</Typography>
					<TablePagination
						component="div"
						size="small"
						count={totalItems}
						page={page}
						onPageChange={onPageChange}
						rowsPerPage={limit}
						onRowsPerPageChange={onRowsPerPageChange}
						rowsPerPageOptions={[10, 20, 50]}
						labelRowsPerPage="Số dòng mỗi trang"
						labelDisplayedRows={() => ''}
						sx={{
							'.MuiTablePagination-toolbar': {
								minHeight: 40,
								px: 0,
							},
						}}
					/>
				</Box>
			</Grid>
		</Grid>
	);
}
