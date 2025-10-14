import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '@/features/auth/pages/Login.tsx';
import Register from '@/features/auth/pages/Register.tsx';
import VerifyEmailPending from '@/features/auth/pages/VerifyEmailPending.tsx';
import VerifiedEmail from '@/features/auth/pages/VerifiedEmail.tsx';
import Dashboard from '@/features/auth/pages/Dashboard.tsx';
import PublicRoute from '@/components/routes/PublicRoute.tsx';
import { ProtectedRoute } from '@/components/routes/ProtectedRoute.tsx';
import AdminLayout from '@/components/AdminLayout.tsx';

export default function App() {
	return (
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
				</Route>
			</Route>

			<Route path="*" element={<Navigate to="/login" />} />
		</Routes>
	);
}
