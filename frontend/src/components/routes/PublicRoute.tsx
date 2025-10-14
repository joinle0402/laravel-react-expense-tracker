import { useAuth } from '@/features/auth/auth.context.tsx';
import LoadingScreen from '@/components/LoadingScreen.tsx';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function PublicRoute() {
	const { user, loading } = useAuth();
	const location = useLocation();
	if (loading) return <LoadingScreen />;
	if (user && !user.verified && location.pathname !== '/verify-email-pending') return <Navigate to="/verify-email-pending" replace />;
	if (user && !user.verified && location.pathname === '/verify-email-pending') return <Outlet />;
	if (user && user.verified && location.pathname !== '/dashboard') return <Navigate to="/admin/dashboard" replace />;
	return <Outlet />;
}
