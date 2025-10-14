import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App.tsx';
import '@/index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from '@/features/auth/auth.context.tsx';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60_000,
			gcTime: 5 * 60 * 1000,
			refetchOnWindowFocus: false,
			refetchOnReconnect: true,
			retry: 1
		},
		mutations: {
			retry: 0
		}
	}
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<BrowserRouter>
					<App />
					<Toaster richColors theme="light" position="top-right" />
					<ReactQueryDevtools initialIsOpen={false} />
				</BrowserRouter>
			</AuthProvider>
		</QueryClientProvider>
	</StrictMode>
);
