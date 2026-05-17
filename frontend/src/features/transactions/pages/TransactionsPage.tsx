import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TransactionTable from '@/features/transactions/components/TransactionTable.tsx';
import useTransactions from '@/features/transactions/hooks/useTransactions.ts';
import TransactionSummary from '@/features/transactions/components/TransactionSummary.tsx';
import TransactionDialog from '@/features/transactions/components/TransactionDialog.tsx';
import { useState } from 'react';

export default function TransactionsPage() {
	const [openDialog, setOpenDialog] = useState(false);
	const response = useTransactions();
	const transactions = response.data;

	const handleButtonCreateClicked = () => setOpenDialog(true);
	const handleCloseTransactionDialog = () => setOpenDialog(false);

	return (
		<Paper>
			<Stack spacing={3}>
				<TransactionSummary />
				<Stack direction="row" sx={{ p: 2, alignItems: 'center', justifyContent: 'space-between' }}>
					<Typography variant="h6" sx={{ fontWeight: 600 }}>
						Quản lý giao dịch
					</Typography>

					<Button variant="contained" startIcon={<AddIcon />} onClick={handleButtonCreateClicked}>
						Thêm giao dịch
					</Button>
				</Stack>
				<TransactionTable view={transactions?.data || []} />
				<TransactionDialog open={openDialog} onClose={handleCloseTransactionDialog} mode="create" />
			</Stack>
		</Paper>
	);
}
