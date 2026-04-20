import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthLayout from '@/common/layout/AuthLayout.tsx';
import Stack from '@mui/material/Stack';
import InputField from '@/common/components/form/InputField.tsx';
import Button from '@mui/material/Button';
import PasswordField from '@/common/components/form/PasswordField.tsx';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { type RegisterPayload, RegisterSchema } from '@/features/auth/schema/auth.schema.ts';
import { useRegister } from '@/features/auth/hooks/use-register.ts';
import { handleApiError } from '@/common/utils/handle-api-error.ts';
import type { MessageResponse } from '@/common/type/api.type.ts';
import { toast } from '@/common/libs/toast.ts';

export default function RegisterPage() {
	const registerMutation = useRegister();
	const { control, handleSubmit, setError } = useForm<RegisterPayload>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			password_confirmation: '',
		},
	});

	const onSubmit = async (values: RegisterPayload) => {
		registerMutation.mutate(values, {
			onSuccess: (response: MessageResponse) => toast.success(response.message),
			onError: (error) => handleApiError({ error, setError }),
		});
	};

	return (
		<AuthLayout title="Đăng ký" subtitle="Tạo tài khoản mới">
			<Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
				<InputField control={control} name="name" label="Họ tên" />
				<InputField control={control} name="email" label="Email" autoComplete="username" />
				<PasswordField control={control} name="password" label="Mật khẩu" />
				<PasswordField control={control} name="password_confirmation" label="Nhập lại mật khẩu" />
				<Button loading={registerMutation.isPending} loadingIndicator="Đang xử lý…" type="submit" variant="contained">
					Đăng ký
				</Button>
				<Typography align="center" variant="body2">
					Đã có tài khoản?{' '}
					<Link component={RouterLink} to="/login">
						Đăng nhập
					</Link>
				</Typography>
			</Stack>
		</AuthLayout>
	);
}
