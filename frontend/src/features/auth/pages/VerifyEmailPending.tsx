import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { me } from '@/features/auth/auth.service.ts';
import type { User } from '@/features/auth/auth.model.ts';

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
						<a href="#" className="text-card-foreground hover:underline">
							{/*<MutateButton*/}
							{/*	variant="outline"*/}
							{/*	loading={resendMutation.isPending}*/}
							{/*	disabled={!email || resendMutation.isPending || !canResend}*/}
							{/*	onClick={() => email && resendMutation.mutate({ email })}*/}
							{/*>*/}
							{/*	{canResend ? 'Gửi lại email' : `Đợi ${fmt(leftMs)}`}*/}
							{/*</MutateButton>*/}
						</a>
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
