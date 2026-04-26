import { Navigate, Outlet } from 'react-router-dom';
import { getStoredToken, getStoredUser } from '@/features/auth/store/auth-store.ts';

export default function PublicRoute() {
	const token = getStoredToken();
	const user = getStoredUser();
	if (token && user && !user.email_verified_at) return <Navigate to="/verify-email" />;
	if (token && user) return <Navigate to="/admin/dashboard" />;
	return <Outlet />;
}
