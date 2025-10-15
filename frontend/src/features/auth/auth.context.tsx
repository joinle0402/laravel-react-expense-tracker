import { createContext, type ReactNode, use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys.ts';
import { me } from '@/features/auth/auth.service.ts';
import type { User } from '@/features/auth/auth.model.ts';

type AuthContextType = {
	user?: User;
	loading: boolean;
	isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType>({ user: undefined, loading: false, isAuthenticated: false });

export function AuthProvider({ children }: { children: ReactNode }) {
	const { data: user, isLoading } = useQuery({
		queryKey: queryKeys.me,
		queryFn: me,
		staleTime: 60_000,
		refetchOnWindowFocus: true,
		enabled: !!localStorage.getItem('access_token'),
		select: (user) => (user ? { ...user, verified: !!user.email_verified_at } : undefined)
	});
	const isAuthenticated = !isLoading && !!user && user.verified;

	return <AuthContext.Provider value={{ user, loading: isLoading, isAuthenticated }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => use(AuthContext);
