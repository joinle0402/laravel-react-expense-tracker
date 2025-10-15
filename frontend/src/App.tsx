import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PublicRoute from '@/components/routes/PublicRoute.tsx';
import { ProtectedRoute } from '@/components/routes/ProtectedRoute.tsx';
import AdminLayout from '@/components/AdminLayout.tsx';
import AppFallback from '@/components/AppFallback.tsx';
import { useAuth } from '@/features/auth/auth.context.tsx';

const Login = lazy(() => import('@/features/auth/pages/Login'));
const Register = lazy(() => import('@/features/auth/pages/Register'));
const VerifyEmailPending = lazy(() => import('@/features/auth/pages/VerifyEmailPending'));
const VerifiedEmail = lazy(() => import('@/features/auth/pages/VerifiedEmail'));

const Dashboard = lazy(() => import('@/features/dashboard/pages/Dashboard'));
const Transactions = lazy(() => import('@/features/transactions/pages/Transactions'));
const Categories = lazy(() => import('@/features/categories/pages/Categories'));
const Accounts = lazy(() => import('@/features/accounts/pages/Accounts'));
const Budgets = lazy(() => import('@/features/budgets/pages/Budgets'));
const Reports = lazy(() => import('@/features/reports/pages/Reports'));
const BankSync = lazy(() => import('@/features/bank-sync/pages/BankSync'));
const Settings = lazy(() => import('@/features/settings/pages/Settings'));

export default function App() {
	const { isAuthenticated } = useAuth();
	return (
		<Suspense fallback={<AppFallback />}>
			<Routes>
				<Route element={<PublicRoute />}>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/verify-email-pending" element={<VerifyEmailPending />} />
					<Route path="/verified" element={<VerifiedEmail />} />
				</Route>

				<Route element={<ProtectedRoute />}>
					<Route element={<AdminLayout />}>
						<Route path="/admin/dashboard" element={<Dashboard />} />
						<Route path="/admin/transactions" element={<Transactions />} />
						<Route path="/admin/categories" element={<Categories />} />
						<Route path="/admin/accounts" element={<Accounts />} />
						<Route path="/admin/budgets" element={<Budgets />} />
						<Route path="/admin/reports" element={<Reports />} />
						<Route path="/admin/bank-sync" element={<BankSync />} />
						<Route path="/admin/settings" element={<Settings />} />
					</Route>
				</Route>

				<Route path="*" element={<Navigate to="/login" />} />
			</Routes>
		</Suspense>
	);
}
