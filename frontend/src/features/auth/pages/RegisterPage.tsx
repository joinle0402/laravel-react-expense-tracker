import { z } from 'zod';
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

const schema = z
	.object({
		name: z.string().min(1, 'Tên không được để trống'),
		email: z.email('Email không hợp lệ'),
		password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
		password_confirmation: z.string().min(1, 'Vui lòng nhập lại mật khẩu'),
	})
	.refine((data) => data.password === data.password_confirmation, {
		message: 'Mật khẩu nhập lại không khớp',
		path: ['password_confirmation'],
	});

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
	const { control, handleSubmit } = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			password_confirmation: '',
		},
	});

	const onSubmit = (values: FormValues) => {
		console.log(values);
	};

	return (
		<AuthLayout title="Đăng ký" subtitle="Tạo tài khoản mới">
			<Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
				<InputField control={control} name="name" label="Họ tên" />
				<InputField control={control} name="email" label="Email" autoComplete="email" />
				<PasswordField control={control} name="password" label="Mật khẩu" />
				<PasswordField control={control} name="password_confirmation" label="Nhập lại mật khẩu" />
				<Button type="submit" variant="contained">
					Submit
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
