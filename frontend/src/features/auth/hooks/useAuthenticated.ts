import { useOutletContext } from 'react-router-dom';
import type { User } from '@/features/auth/auth.model.ts';

export default function useAuthenticated() {
	return useOutletContext<{ user: User }>();
}
