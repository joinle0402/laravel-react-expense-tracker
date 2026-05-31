import type { Transaction } from '@/features/transactions/types/transaction.type.ts';
import { DataGrid, type GridPaginationModel, type GridRowSelectionModel, type GridSortModel } from '@mui/x-data-grid';
import { formatCurrency, formatDate } from '@/common/utils/format.ts';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';

interface CategoryTableProps {
	view: Transaction[];
	onDelete: (transaction: Transaction) => void;
	total: number;
	page: number;
	limit: number;
	search: string;
	loading: boolean;
	rowSelectionModel: GridRowSelectionModel;
	onRowSelectionModelChange: (model: GridRowSelectionModel) => void;
	sortModel: GridSortModel;
	onSortModelChange: (sortModel: GridSortModel) => void;
	onPaginationModelChange: (model: GridPaginationModel) => void;
}

export default function TransactionTable({
	view,
	loading,
	total,
	page,
	limit,
	search,
	sortModel,
	rowSelectionModel,
	onRowSelectionModelChange,
	onSortModelChange,
	onPaginationModelChange,
	onDelete,
}: CategoryTableProps) {
	return (
		<Paper
			elevation={0}
			sx={{
				border: 1,
				borderColor: 'divider',
				borderRadius: 1,
				overflow: 'hidden',
				height: 'calc(100vh - 370px)',
				minHeight: 360,
			}}
		>
			<DataGrid
				checkboxSelection
				keepNonExistentRowsSelected
				rowSelectionModel={rowSelectionModel}
				onRowSelectionModelChange={onRowSelectionModelChange}
				disableColumnMenu
				disableColumnFilter
				disableColumnSelector
				disableDensitySelector
				disableRowSelectionOnClick
				rows={view}
				columns={[
					{
						field: 'index',
						headerName: '#',
						width: 70,
						sortable: false,
						filterable: false,
						renderCell: params => {
							const rowIndex = params.api.getRowIndexRelativeToVisibleRows(params.id);
							return page * limit + rowIndex + 1;
						},
					},
					{
						field: 'dated',
						headerName: 'Ngày giao dịch',
						width: 150,
						valueFormatter: value => formatDate(value),
					},
					{
						field: 'type',
						headerName: 'Loại giao dịch',
						width: 150,
						renderCell: params => (
							<Chip
								label={params.row.type === 'income' ? 'Thu nhập' : 'Chi tiêu'}
								color={params.row.type === 'income' ? 'success' : 'error'}
								size="small"
								variant="filled"
								sx={{ fontWeight: 600 }}
							/>
						),
					},
					{
						field: 'category',
						headerName: 'Danh mục',
						sortable: false,
						width: 160,
						valueGetter: (_value, row) => row.category?.name || '-',
					},
					{
						field: 'amount',
						headerName: 'Số tiền',
						width: 160,
						align: 'right',
						headerAlign: 'right',
						renderCell: params => (
							<Typography
								sx={{
									fontWeight: 600,
									color: params.row.type === 'income' ? 'success.main' : 'error.main',
								}}
							>
								{params.row.type === 'income' ? '+' : '-'}
								{formatCurrency(params.row.amount)}
							</Typography>
						),
					},
					{
						field: 'note',
						headerName: 'Ghi chú',
						flex: 1,
						minWidth: 220,
						sortable: false,
						renderCell: params => (
							<Typography
								variant="body2"
								sx={{
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',
								}}
								title={params.row.note || ''}
							>
								{params.row.note || '-'}
							</Typography>
						),
					},
					{
						field: 'created_at',
						headerName: 'Ngày tạo',
						width: 150,
						valueFormatter: value => formatDate(value),
					},
					{
						field: 'actions',
						headerName: 'Hành động',
						width: 130,
						align: 'right',
						headerAlign: 'right',
						sortable: false,
						filterable: false,
						renderCell: params => (
							<Stack
								direction="row"
								spacing={1}
								sx={{
									width: '100%',
									height: '100%',
									justifyContent: 'flex-end',
									alignItems: 'center',
								}}
							>
								<Tooltip title="Sửa">
									<IconButton size="small" color="primary">
										<EditIcon fontSize="small" />
									</IconButton>
								</Tooltip>

								<Tooltip title="Xoá">
									<IconButton size="small" color="error" onClick={() => onDelete(params.row)}>
										<DeleteIcon fontSize="small" />
									</IconButton>
								</Tooltip>
							</Stack>
						),
					},
				]}
				getRowId={row => row.id}
				loading={loading}
				rowCount={total}
				paginationMode="server"
				paginationModel={{ page, pageSize: limit }}
				onPaginationModelChange={onPaginationModelChange}
				sortingOrder={['asc', 'desc', null]}
				sortingMode="server"
				sortModel={sortModel}
				onSortModelChange={onSortModelChange}
				pageSizeOptions={[10, 20, 50, 100]}
				rowHeight={48}
				columnHeaderHeight={44}
				localeText={{
					noRowsLabel: search ? 'Không tìm thấy dữ liệu phù hợp' : 'Không có dữ liệu',
					paginationDisplayedRows: ({ from, to, count }) => `${from}-${to} trong ${count}`,
					paginationRowsPerPage: 'Số dòng mỗi trang',
				}}
				sx={{
					'& .MuiDataGrid-columnHeaders': {
						bgcolor: '#F8FAFC',
						borderBottom: theme => `1px solid ${theme.palette.divider}`,
					},

					'& .MuiDataGrid-columnHeaderTitle': {
						fontWeight: 700,
						fontSize: 12,
						color: 'text.secondary',
						textTransform: 'uppercase',
					},

					'& .MuiDataGrid-row:hover': {
						bgcolor: 'action.hover',
					},

					'& .MuiDataGrid-cell': {
						borderBottom: theme => `1px solid ${theme.palette.divider}`,
						outline: 'none',
					},

					'& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus': {
						outline: 'none',
					},

					'& .MuiDataGrid-footerContainer': {
						minHeight: 52,
						borderTop: theme => `1px solid ${theme.palette.divider}`,
					},

					'& .MuiTablePagination-toolbar': {
						minHeight: 52,
					},

					'& .MuiDataGrid-overlayWrapper': {
						minHeight: 220,
					},
				}}
			/>
		</Paper>
	);
}
