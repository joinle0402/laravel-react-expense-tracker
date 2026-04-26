import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import AuthLayout from '@/common/layout/AuthLayout.tsx';
import InputField from '@/common/components/form/InputField.tsx';
import PasswordField from '@/common/components/form/PasswordField.tsx';
import { type LoginPayload, LoginSchema } from '@/features/auth/schema/auth.schema.ts';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api/auth.api.ts';
import { toast } from '@/common/libs/toast.ts';
import { saveAuth } from '@/features/auth/store/auth-store.ts';
import { handleApiError } from '@/common/utils/handle-api-error.ts';

export default function LoginPage() {
	const navigate = useNavigate();
	const { control, handleSubmit, setError } = useForm<LoginPayload>({
		resolver: zodResolver(LoginSchema),
		defaultValues: { email: '', password: '' },
	});
	const { mutate: onSubmit } = useMutation({
		mutationFn: authApi.login,
		onSuccess: (response) => {
			toast.success('Đăng nhập thông');
			saveAuth(response.data.token, response.data.user);
			if (!response.data.user.email_verified_at) {
				navigate('/verify-email', { replace: true });
			} else {
				navigate('/admin/dashboard', { replace: true });
			}
		},
		onError: (error) => {
			handleApiError({ error, setError });
		},
	});

	return (
		<AuthLayout title="Đăng nhập" subtitle="Chào mừng bạn quay lại">
			<Stack component="form" spacing={2} onSubmit={handleSubmit((payload) => onSubmit(payload))}>
				<InputField control={control} name="email" autoComplete="email" label="Email" />
				<PasswordField control={control} name="password" label="Mật khẩu" />
				<Button type="submit" variant="contained" size="large">
					Đăng nhập
				</Button>
				<Typography align="center" variant="body2">
					Chưa có tài khoản?{' '}
					<Link component={RouterLink} to="/register">
						Đăng ký
					</Link>
				</Typography>
			</Stack>
		</AuthLayout>
	);
}
