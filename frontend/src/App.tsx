import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '@/features/auth/pages/LoginPage.tsx';
import RegisterPage from '@/features/auth/pages/RegisterPage';
import VerifyEmailPage from '@/features/auth/pages/VerifyEmailPage.tsx';
import PublicRoute from '@/features/auth/components/PublicRoute.tsx';
import DashboardPage from '@/features/admin/pages/DashboardPage.tsx';
import AdminLayout from '@/common/layout/AdminLayout.tsx';
import TransactionsPage from '@/features/transactions/pages/TransactionsPage.tsx';
import CategoryPage from '@/features/category/page/CategoryPage.tsx';
import ButgetPage from '@/features/budget/pages/ButgetPage.tsx';
import SettingPage from '@/features/setting/pages/SettingPage.tsx';
import NotFoundPage from '@/common/pages/NotFoundPage.tsx';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<PublicRoute />}>
					<Route path="/" element={<Navigate to="/login" replace />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
				</Route>
				<Route path="/verify-email" element={<VerifyEmailPage />} />
				<Route path="/verify-email/:id/:hash" element={<VerifyEmailPage />} />
				<Route path="/admin" element={<AdminLayout />}>
					<Route path="dashboard" element={<DashboardPage />} />
					<Route path="transactions" element={<TransactionsPage />} />
					<Route path="categories" element={<CategoryPage />} />
					<Route path="budgets" element={<ButgetPage />} />
					<Route path="settings" element={<SettingPage />} />
				</Route>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);
}
