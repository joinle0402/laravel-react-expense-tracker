import { useState } from 'react';
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
import type { TransactionFiltersValue } from '@/features/transactions/types/transaction.type.ts';
import dayjs from 'dayjs';
import useDebounce from '@/common/hooks/useDebounce.ts';

const initialFilters: TransactionFiltersValue = {
	search: '',
	type: 'all',
	fromDate: dayjs().startOf('month').format('YYYY-MM-DD'),
	toDate: dayjs().format('YYYY-MM-DD'),
};

export default function TransactionsPage() {
	const [filters, setFilters] = useState<TransactionFiltersValue>(initialFilters);
	const debouncedSearch = useDebounce(filters.search, 400);
	const [openDialog, setOpenDialog] = useState(false);
	const { data: transactions } = useTransactions({ ...filters, search: debouncedSearch });

	const handleButtonCreateClicked = () => setOpenDialog(true);
	const handleCloseTransactionDialog = () => setOpenDialog(false);

	return (
		<Paper
			elevation={0}
			sx={theme => ({
				p: 2,
				borderRadius: 2,
				border: `1px solid ${theme.palette.divider}`,
				bgcolor: 'background.paper',
				maxHeight: 'calc(100vh - 58px - 32px)',
				height: '100%',

				display: 'flex',
				flexDirection: 'column',
			})}
		>
			<Stack spacing={1} sx={{ height: '100%', minHeight: 0 }}>
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

					<Button variant="contained" startIcon={<AddIcon />} onClick={handleButtonCreateClicked}>
						Thêm giao dịch
					</Button>
				</Stack>
				<TransactionFilters value={filters} onChange={setFilters} onReset={() => setFilters(initialFilters)} />
				<Box sx={{ flex: 1, minHeight: 0 }}>
					<TransactionTable view={transactions?.data || []} />
				</Box>
				<TransactionDialog open={openDialog} onClose={handleCloseTransactionDialog} mode="create" />
			</Stack>
		</Paper>
	);
}
