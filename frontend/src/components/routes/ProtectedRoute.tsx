import { useAuth } from '@/features/auth/auth.context.tsx';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import LoadingScreen from '@/components/LoadingScreen.tsx';

export function ProtectedRoute() {
	const { user, loading } = useAuth();
	const location = useLocation();
	if (loading) return <LoadingScreen />;
	if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
	if (!user.verified && location.pathname !== '/verify-email-pending') return <Navigate to="/verify-email-pending" replace />;
	return <Outlet context={{ user }} />;
}
