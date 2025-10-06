import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldSeparator } from '@/components/ui/field';

import { z } from 'zod';
import { FormProvider } from 'react-hook-form';
import InputField from '@/components/form/InputField.tsx';
import PasswordField from '@/components/form/PasswordField.tsx';
import { useZodForm } from '@/hooks/useZodForm.ts';

const LoginSchema = z.object({
	email: z.email('Email không hợp lệ').trim().toLowerCase().default(''),
	password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự').max(128, 'Mật khẩu quá dài').default('')
});

type LoginValues = z.infer<typeof LoginSchema>;

export default function Login() {
	const form = useZodForm(LoginSchema);

	const onSubmit = async (values: LoginValues) => {
		console.log('Login with:', values);
	};

	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center px-4 py-8 md:px-10">
			<div className="w-full max-w-sm">
				<Card>
					<CardContent className="p-6">
						<FormProvider {...form}>
							<form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
								<FieldGroup className="flex flex-col gap-3">
									<InputField id="email" name="email" label="Email" placeholder="Enter your email address" />
									<PasswordField id="password" name="password" label="Password" placeholder="Enter your password" />
									<Button type="submit" className="w-full">
										Login
									</Button>
								</FieldGroup>

								<FieldDescription className="text-center text-sm">
									Don&apos;t have an account?{' '}
									<a href="#" className="underline underline-offset-2">
										Sign up
									</a>
								</FieldDescription>

								<FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">Or continue with</FieldSeparator>

								<Field className="grid grid-cols-2 gap-3">
									<Button className="bg-[#DB4437] hover:bg-[#c33d31] text-white w-full" type="button">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
											<path
												fill="currentColor"
												d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
											/>
										</svg>
										Google
									</Button>

									<Button className="bg-[#24292F] hover:bg-[#1c1f23] text-white w-full" type="button">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
											<path
												fill="currentColor"
												d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.41 7.86 10.95.58.11.79-.25.79-.55v-2.15c-3.2.69-3.87-1.54-3.87-1.54-.53-1.33-1.29-1.69-1.29-1.69-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.73 1.26 3.39.96.11-.76.41-1.26.75-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11.2 11.2 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.6.23 2.78.11 3.07.74.81 1.19 1.83 1.19 3.09 0 4.42-2.68 5.39-5.23 5.68.42.36.8 1.09.8 2.21v3.28c0 .3.21.66.8.55A11.51 11.51 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5z"
											/>
										</svg>
										GitHub
									</Button>
								</Field>
							</form>
						</FormProvider>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
