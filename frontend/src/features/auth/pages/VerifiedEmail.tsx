import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function VerifiedEmail() {
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	useEffect(() => {
		toast.success(params.get('message') ?? 'Email xác thực thành công!');
		queryClient.invalidateQueries({ queryKey: ['auth', 'me'] }).then();
		localStorage.removeItem('verify_email');
		navigate('/admin/dashboard', { replace: true });
	}, []);

	return <div className="p-8 text-muted-foreground text-sm">Đang xác nhận phiên...</div>;
}
