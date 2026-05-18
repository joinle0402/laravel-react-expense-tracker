import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { ReactNode } from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

type SummaryCardProps = {
	title: string;
	value?: number | null;
	color?: 'primary' | 'success' | 'error' | 'warning' | 'info';
	isCurrency?: boolean;
	icon: ReactNode;
};

function SummaryCard({ title, value = 0, color, isCurrency = false, icon }: SummaryCardProps) {
	const formattedValue = !value
		? '-'
		: isCurrency
			? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value)
			: value?.toLocaleString('vi-VN');
	return (
		<Paper
			elevation={0}
			sx={theme => ({
				p: 2,
				height: '100%',
				borderRadius: 2,
				border: `1px solid ${theme.palette.divider}`,
				bgcolor: theme.palette.background.paper,
			})}
		>
			<Stack spacing={1}>
				<Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
					<Typography variant="body2" color="text.secondary">
						{title}
					</Typography>

					<Box
						sx={{
							width: 36,
							height: 36,
							borderRadius: 2,
							display: 'grid',
							placeItems: 'center',
							bgcolor: `${color}.50`,
							color: `${color}.main`,
						}}
					>
						{icon}
					</Box>
				</Stack>
				<Typography variant="h5" sx={{ fontWeight: 700, color: `${color}.main`, fontVariantNumeric: 'tabular-nums' }}>
					{formattedValue}
				</Typography>
			</Stack>
		</Paper>
	);
}

type TransactionSummaryProps = {
	summary?: {
		totalIncome?: number | null | undefined;
		totalExpense?: number | null | undefined;
		balance?: number | null | undefined;
		transactionCount?: number | null | undefined;
	} | null;
};

export default function TransactionSummary({ summary }: TransactionSummaryProps) {
	return (
		<Grid container spacing={2}>
			<Grid size={{ xs: 12, sm: 6, md: 3 }}>
				<SummaryCard
					title="Tổng thu"
					value={summary?.totalIncome}
					color="success"
					isCurrency={true}
					icon={<TrendingUpIcon fontSize="small" />}
				/>
			</Grid>
			<Grid size={{ xs: 12, sm: 6, md: 3 }}>
				<SummaryCard
					title="Tổng chi"
					value={summary?.totalExpense}
					color="error"
					isCurrency={true}
					icon={<TrendingDownIcon fontSize="small" />}
				/>
			</Grid>
			<Grid size={{ xs: 12, sm: 6, md: 3 }}>
				<SummaryCard
					title="Số dư"
					value={summary?.balance}
					color={(summary?.balance || 0) >= 0 ? 'primary' : 'error'}
					isCurrency={true}
					icon={<AccountBalanceWalletIcon fontSize="small" />}
				/>
			</Grid>
			<Grid size={{ xs: 12, sm: 6, md: 3 }}>
				<SummaryCard
					title="Số giao dịch"
					value={summary?.transactionCount}
					color="info"
					isCurrency={false}
					icon={<ReceiptLongIcon fontSize="small" />}
				/>
			</Grid>
		</Grid>
	);
}
