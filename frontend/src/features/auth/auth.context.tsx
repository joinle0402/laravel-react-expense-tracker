import { createContext, type ReactNode, use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys.ts';
import { me } from '@/features/auth/auth.service.ts';
import type { User } from '@/features/auth/auth.model.ts';

type AuthContextType = {
	user: User | null;
	loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({ user: null, loading: false });

export function AuthProvider({ children }: { children: ReactNode }) {
	const { data: user = null, isLoading } = useQuery({
		queryKey: queryKeys.me,
		queryFn: me,
		staleTime: 60_000,
		refetchOnWindowFocus: true,
		enabled: !!localStorage.getItem('access_token'),
		select: (user) => (user ? { ...user, verified: !!user.email_verified_at } : null)
	});
	return <AuthContext.Provider value={{ user, loading: isLoading }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => use(AuthContext);
