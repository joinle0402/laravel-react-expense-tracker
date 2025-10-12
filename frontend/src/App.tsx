import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '@/features/auth/pages/Login.tsx';
import Register from '@/features/auth/pages/Register.tsx';
import VerifyEmailPending from '@/features/auth/pages/VerifyEmailPending.tsx';
import VerifiedEmail from '@/features/auth/pages/VerifiedEmail.tsx';
import Dashboard from '@/features/auth/pages/Dashboard.tsx';

export default function App() {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/verify-email-pendding" element={<VerifyEmailPending />} />
			<Route path="/verified" element={<VerifiedEmail />} />
			<Route path="/admin/dashboard" element={<Dashboard />} />
			<Route path="*" element={<Navigate to="/login" />} />
		</Routes>
	);
}
