import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import AuthLayout from '@/common/layout/AuthLayout.tsx';
import InputField from '@/common/components/form/InputField.tsx';
import PasswordField from '@/common/components/form/PasswordField.tsx';
import { type LoginPayload, LoginSchema } from '@/features/auth/schema/auth.schema.ts';

export default function LoginPage() {
	const { control, handleSubmit } = useForm<LoginPayload>({
		resolver: zodResolver(LoginSchema),
		defaultValues: { email: '', password: '' },
	});

	const onSubmit = (values: LoginPayload) => {
		console.log(values);
	};

	return (
		<AuthLayout title="Đăng nhập" subtitle="Chào mừng bạn quay lại">
			<Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
				<InputField control={control} name="email" label="Email" />
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
