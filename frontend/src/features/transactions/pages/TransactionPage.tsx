import { useState } from 'react';
import type { GridRowSelectionModel, GridSortModel } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import TransactionTable from '@/features/transactions/components/TransactionTable.tsx';
import useTransactions from '@/features/transactions/hooks/useTransactions.ts';
import TransactionSummary from '@/features/transactions/components/TransactionSummary.tsx';
import TransactionDialog from '@/features/transactions/components/TransactionDialog.tsx';
import TransactionFilters from '@/features/transactions/components/TransactionFilters.tsx';
import type { Transaction, TransactionFiltersValue } from '@/features/transactions/types/transaction.type.ts';
import dayjs from 'dayjs';
import useDebounce from '@/common/hooks/useDebounce.ts';
import useDeleteTransaction from '@/features/transactions/hooks/useDeleteTransaction.ts';
import useConfirmDialog from '@/common/hooks/useConfirmDialog.ts';
import DeleteIcon from '@mui/icons-material/Delete';
import useBulkDeleteTransaction from '@/features/transactions/hooks/useBulkDeleteTransaction.ts';

const initialFilters: TransactionFiltersValue = {
	search: '',
	type: 'all',
	fromDate: dayjs().startOf('month').format('YYYY-MM-DD'),
	toDate: dayjs().format('YYYY-MM-DD'),
};

export default function TransactionPage() {
	const [page, setPage] = useState<number>(0);
	const [limit, setLimit] = useState<number>(100);
	const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>({ type: 'include', ids: new Set() });
	const selectedIds = [...rowSelectionModel.ids];
	const [sortModel, setSortModel] = useState<GridSortModel>([]);
	const [filters, setFilters] = useState<TransactionFiltersValue>(initialFilters);
	const debouncedSearch = useDebounce(filters.search, 400);
	const [openDialog, setOpenDialog] = useState(false);
	const { data: transactions, isLoading = false } = useTransactions({
		...filters,
		search: debouncedSearch,
		page: page + 1,
		limit,
		sortBy: sortModel[0]?.field,
		sortOrder: sortModel[0]?.sort || undefined,
	});
	const { mutateAsync: deleteTransaction } = useDeleteTransaction();
	const { mutateAsync: bulkDeleteTransaction } = useBulkDeleteTransaction();
	const { deleteConfirm } = useConfirmDialog();

	const handleButtonCreateClicked = () => setOpenDialog(true);
	const handleCloseTransactionDialog = () => setOpenDialog(false);

	const handleDeleteTransaction = async (transaction: Transaction) => {
		await deleteConfirm({
			title: `Xóa giao dịch ${transaction.type === 'expense' ? 'chi tiêu' : 'thu nhập'}?`,
			onConfirm: () => deleteTransaction(transaction.id),
		});
	};

	const handleBulkDeleteTransactions = async () => {
		if (selectedIds.length === 0) return;
		await deleteConfirm({
			title: `Xóa ${selectedIds.length} giao dịch đã chọn?`,
			onConfirm: async () => {
				await bulkDeleteTransaction(selectedIds as string[]);
				setRowSelectionModel({ type: 'include', ids: new Set() });
			},
		});
	};

	const handlePaginationModelChange = (model: { page: number; pageSize: number }) => {
		setPage(model.page);
		setLimit(model.pageSize);
	};

	const handleSortModelChange = (model: GridSortModel) => {
		setSortModel(model.slice(0, 1));
		setPage(0);
	};

	const handleTransactionFiltersChange = (nextFilters: TransactionFiltersValue) => {
		setFilters(nextFilters);
		setPage(0);
	};

	const handleTransactionFiltersReset = () => {
		setFilters(initialFilters);
		setPage(0);
	};

	return (
		<Paper
			elevation={0}
			sx={theme => ({
				p: 2,
				borderRadius: 2,
				border: `1px solid ${theme.palette.divider}`,
				bgcolor: 'background.paper',

				height: 'auto',
				minHeight: 'unset',

				display: 'flex',
				flexDirection: 'column',
			})}
		>
			<Stack spacing={1}>
				<TransactionSummary summary={transactions?.summary} />
				<Stack direction="row" sx={{ p: 1, alignItems: 'center', justifyContent: 'space-between' }}>
					<Box>
						<Typography variant="h6" sx={{ fontWeight: 700 }}>
							Quản lý giao dịch
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Theo dõi thu nhập và chi tiêu của bạn
						</Typography>
					</Box>

					<Stack direction="row" spacing={1}>
						{selectedIds.length > 0 && (
							<Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleBulkDeleteTransactions}>
								Xóa đã chọn ({selectedIds.length})
							</Button>
						)}

						<Button variant="contained" startIcon={<AddIcon />} onClick={handleButtonCreateClicked}>
							Thêm giao dịch
						</Button>
					</Stack>
				</Stack>
				<TransactionFilters value={filters} onChange={handleTransactionFiltersChange} onReset={handleTransactionFiltersReset} />
				<Box>
					<TransactionTable
						view={transactions?.data || []}
						onDelete={handleDeleteTransaction}
						total={transactions?.summary?.transactionCount || 0}
						page={page}
						limit={limit}
						search={filters?.search}
						loading={isLoading}
						sortModel={sortModel}
						rowSelectionModel={rowSelectionModel}
						onRowSelectionModelChange={setRowSelectionModel}
						onSortModelChange={handleSortModelChange}
						onPaginationModelChange={handlePaginationModelChange}
					/>
				</Box>
				<TransactionDialog open={openDialog} onClose={handleCloseTransactionDialog} mode="create" />
			</Stack>
		</Paper>
	);
}
