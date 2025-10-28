import { useZodForm } from '@/hooks/useZodForm.ts';
import { CategoryFormSchema } from '@/features/categories/schemas.ts';
import { FormProvider } from 'react-hook-form';
import type { CategoryForm } from '@/features/categories/types.ts';
import InputField from '@/components/form/InputField.tsx';
import SubmitButton from '@/components/form/SubmitButton.tsx';

export default function CategoryForm() {
	const methods = useZodForm(CategoryFormSchema);

	const onSubmit = async (form: CategoryForm) => {
		try {
			console.log(form);
			// const response = await mutateAsync(form);
			// toast.success(response.message);
			// tokenStore.access = response.data.access_token;
			// queryClient.setQueryData(queryKeys.me, response.data.user);
			// await queryClient.invalidateQueries({ queryKey: queryKeys.me });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<FormProvider {...methods}>
			<form className="flex flex-col gap-4" onSubmit={methods.handleSubmit(onSubmit)}>
				<InputField id="name" name="name" label="Tên danh mục" placeholder="Nhập tên danh mục" />
				<InputField id="icon" name="icon" label="Ảnh danh mục" placeholder="Nhập ảnh danh mục" />
				<SubmitButton />
			</form>
		</FormProvider>
	);
}
