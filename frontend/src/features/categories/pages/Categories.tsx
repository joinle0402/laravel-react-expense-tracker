import CategoryTable from '@/features/categories/components/CategoryTable.tsx';
import { useState } from 'react';
import { useCategories } from '@/features/categories/queries.ts';
import PaginationBar from '@/components/PaginationBar.tsx';

export default function Categories() {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const { data } = useCategories({ page, per_page: limit });

	const meta = data?.meta ?? { current_page: page, per_page: limit, total: 0, last_page: 1 };

	return (
		<section className="space-y-2">
			<CategoryTable data={data?.data || []} page={meta.current_page} pageSize={limit} />
			<PaginationBar page={meta.current_page} totalPages={meta.last_page} onPageChange={setPage} pageSize={limit} onPageSizeChange={setLimit} />
		</section>
	);
}
