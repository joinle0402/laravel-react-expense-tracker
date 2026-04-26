import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '@/features/auth/pages/LoginPage.tsx';
import RegisterPage from '@/features/auth/pages/RegisterPage';
import VerifyEmailPage from '@/features/auth/pages/VerifyEmailPage.tsx';
import PublicRoute from '@/features/auth/components/PublicRoute.tsx';
import AdminDashboard from '@/features/admin/pages/AdminDashboard.tsx';

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
				<Route path="/admin/dashboard" element={<AdminDashboard />} />
			</Routes>
		</BrowserRouter>
	);
}
