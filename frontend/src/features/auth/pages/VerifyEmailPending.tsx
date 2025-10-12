import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { me, resend } from '@/features/auth/auth.service.ts';
import type { User } from '@/features/auth/auth.model.ts';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button.tsx';

export default function VerifyEmailPending() {
	const queryClient = useQueryClient();
	const { data: user } = useQuery({
		queryKey: ['auth', 'me'],
		queryFn: me,
		placeholderData: queryClient.getQueryData<User>(['auth', 'me']),
		refetchOnWindowFocus: false,
		enabled: false
	});
	const email = (user?.email || localStorage.getItem('verify_email')) ?? '';
	const resendMutation = useMutation({
		mutationFn: resend,
		onSuccess: (response) => {
			toast.success(response.message);
		},
		onError: (error) => {
			console.log(error);
			toast.error('Gửi lại thất bại', { description: 'Vui lòng thử lại sau.' });
		}
	});

	return (
		<div className="mx-auto max-w-md p-4">
			<Card className="shadow-xl">
				<CardHeader>
					<CardTitle className="mb-1.5 text-2xl">Verify your email</CardTitle>
					<CardDescription className="text-base">
						Một liên kết kích hoạt đã được gửi đến địa chỉ email của bạn: <span className="font-medium">{email}</span>. Vui lòng kiểm tra
						hộp thư đến và nhấp vào liên kết để hoàn tất quy trình kích hoạt.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-muted-foreground text-center">
						Không nhận được email ?{' '}
						<Button
							className="text-card-foreground hover:underline px-1"
							variant="link"
							disabled={!email || resendMutation.isPending}
							onClick={() => email && resendMutation.mutate(email)}
						>
							Gửi lại email
						</Button>
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
