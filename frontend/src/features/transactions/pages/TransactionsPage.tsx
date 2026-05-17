import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TransactionTable from '@/features/transactions/components/TransactionTable.tsx';
import useTransactions from '@/features/transactions/hooks/useTransactions.ts';
import TransactionSummary from '@/features/transactions/components/TransactionSummary.tsx';
import TransactionDialog from '@/features/transactions/components/TransactionDialog.tsx';

export default function TransactionsPage() {
	const response = useTransactions();
	const transactions = response.data;
	return (
		<Paper>
			<Stack spacing={3}>
				<TransactionSummary />
				<TransactionTable view={transactions?.data || []} />
				<TransactionDialog open={true} mode={'create'} />
			</Stack>
		</Paper>
	);
}
