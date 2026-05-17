import { createRoot } from 'react-dom/client';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import App from './App.tsx';
import CssBaseline from '@mui/material/CssBaseline';
import ConfirmDialogProvider from '@/common/providers/ConfirmDialogProvider.tsx';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			staleTime: 1000 * 60 * 5,
			refetchOnReconnect: true,
			refetchOnMount: true,
		},
		mutations: {
			retry: false,
		},
	},
});

createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
			<ConfirmDialogProvider>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<CssBaseline />
					<App />
				</LocalizationProvider>
			</ConfirmDialogProvider>
		</SnackbarProvider>
	</QueryClientProvider>,
);
