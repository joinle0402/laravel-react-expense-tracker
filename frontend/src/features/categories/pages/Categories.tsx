import CategoryTable from '@/features/categories/components/CategoryTable.tsx';

export default function Categories() {
	return (
		<section className="space-y-2">
			<h1 className="text-2xl font-semibold">Quản lý Danh mục</h1>
			<CategoryTable />
		</section>
	);
}
