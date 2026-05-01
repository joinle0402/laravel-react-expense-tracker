import { useEffect } from 'react';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api/auth.api.ts';
import { toast } from '@/common/libs/toast.ts';
import useCountdown from '@/common/hooks/useCountdown.ts';
import { getErrorMessage, handleApiError } from '@/common/utils/handle-api-error.ts';
import { getStoredUser, setStoredUser } from '@/features/auth/store/auth-store.ts';
import AuthLayout from '@/common/layout/AuthLayout.tsx';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

export default function VerifyEmailPage() {
	const navigate = useNavigate();
	const currentUser = getStoredUser();
	const { countdown, isCounting, start: startCountDown } = useCountdown();
	const resendMutation = useMutation({ mutationFn: authApi.resendEmail });
	const verifyMutation = useMutation({ mutationFn: authApi.verifyEmail });
	const [searchParams] = useSearchParams();
	const { id = '', hash = '' } = useParams();
	const expires = searchParams.get('expires') || '';
	const signature = searchParams.get('signature') || '';

	const isVerifyMode = !!id && !!hash && !!expires && !!signature;
	const hasVeriredEmail = !!currentUser?.email_verified_at;

	if (hasVeriredEmail) {
		return <Navigate to="/admin/dashboard" replace={true} />;
	}

	useEffect(() => {
		if (!isVerifyMode) return;
		verifyMutation.mutate(
			{ id, hash, signature, expires },
			{
				onSuccess: response => {
					toast.success(response.message);
					setStoredUser(response.data.user);
					navigate('/admin/dashboard', { replace: true });
				},
				onError: error => handleApiError({ error }),
			},
		);
	}, []);

	const handleButtonResendClicked = async () => {
		if (isCounting) return;
		resendMutation.mutate(undefined, {
			onSuccess: response => {
				toast.success(response.message);
				startCountDown();
			},
			onError: error => handleApiError({ error }),
		});
	};

	const handleGoToLogin = () => navigate('/login', { replace: true });
	const handleGoToDashboard = () => navigate('/admin/dashboard', { replace: true });

	return (
		<AuthLayout title="Xác thực email">
			<Stack spacing={2}>
				{!isVerifyMode && (
					<>
						<Typography sx={{ pt: 2 }}>
							Xin chào {currentUser?.name || 'bạn'}, tài khoản của bạn đã được tạo. Vui lòng kiểm tra email <b>{currentUser?.email}</b>{' '}
							để xác thực.
						</Typography>
						<Button variant="contained" disabled={isCounting} onClick={handleButtonResendClicked}>
							{isCounting ? `Gửi lại sau ${countdown} Giây` : 'Gửi lại email xác thực'}
						</Button>
						<Button variant="outlined" onClick={handleGoToLogin}>
							Về trang đăng nhập
						</Button>
					</>
				)}
				{isVerifyMode && (
					<>
						{verifyMutation.isPending && (
							<Stack spacing={2} sx={{ justifyContent: 'center' }}>
								<CircularProgress />
								<Typography>Đang xác thực email...</Typography>
							</Stack>
						)}
						{verifyMutation.isSuccess && (
							<>
								<Alert severity="success">{verifyMutation.data.message}</Alert>
								<Typography>Email của bạn đã được xác thực thành công.</Typography>
								<Button variant="contained" onClick={handleGoToDashboard}>
									Vào ứng dụng
								</Button>
							</>
						)}
						{verifyMutation.isError && (
							<>
								<Alert severity="error">{getErrorMessage(verifyMutation.error)}</Alert>
								<Typography>Link xác thực có thể đã hết hạn hoặc không hợp lệ.</Typography>
								<Button variant="contained" onClick={() => navigate('/verify-email', { replace: true })}>
									Quay lại trang xác thực
								</Button>
							</>
						)}
					</>
				)}
			</Stack>
		</AuthLayout>
	);
}
