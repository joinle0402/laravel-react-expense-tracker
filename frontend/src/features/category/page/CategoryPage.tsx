import { type ChangeEvent, type MouseEvent, type SyntheticEvent, useState } from 'react';
import type { Category, CategoryTab } from '@/features/category/types/category.type';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import useDebounce from '@/common/hooks/useDebounce.ts';
import useCategories from '@/features/category/hooks/useCategories.ts';
import useConfirmDialog from '@/common/hooks/useConfirmDialog.ts';
import CategoryToolbar from '@/features/category/components/CategoryToolbar.tsx';
import CategoryTable from '@/features/category/components/CategoryTable.tsx';

export default function CategoryPage() {
	const [tab, setTab] = useState<CategoryTab>('all');
	const [search, setSearch] = useState<string>('');
	const [page, setPage] = useState<number>(0);
	const [limit, setLimit] = useState<number>(10);
	const debouncedSearch = useDebounce(search);
	const { data: response, isLoading, isFetching } = useCategories({ tab, search: debouncedSearch.trim(), page: page + 1, limit });
	const counts = response?.meta?.counts;
	const { deleteConfirm } = useConfirmDialog();
	const handleButtonDeleteClick = async (category: Category) => {
		const confirmed = await deleteConfirm({
			title: `Xóa danh mục "${category.name}"?`,
			warning: 'Danh mục này sẽ không còn xuất hiện khi tạo giao dịch mới. Các giao dịch cũ dùng danh mục này vẫn được giữ nguyên.',
			message: 'Hành động này chỉ đánh dấu danh mục là đã xóa, không xóa giao dịch cũ.',
			maxWidth: 'sm',
		});
		console.log('-', confirmed);
	};

	const handlePageChange = (_event: MouseEvent<HTMLButtonElement> | null, page: number) => setPage(page);

	const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
		setLimit(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleButtonEditClick = async (category: Category) => {
		console.log('handleButtonEditCategoryClick', category);
	};

	const handleTabChange = (_event: SyntheticEvent, value: CategoryTab) => {
		console.log(value);
		setTab(value);
		setPage(0);
	};
	const handleSearchChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		console.log(event.target.value);
		setSearch(event.target.value);
		setPage(0);
	};

	return (
		<Box sx={{ p: 1 }}>
			<Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
				<Box>
					<Typography variant="h5" sx={{ fontWeight: 700 }}>
						Quản lý danh mục
					</Typography>

					<Typography variant="body2" color="text.secondary">
						Tạo và quản lý danh mục thu nhập, chi tiêu của bạn.
					</Typography>
				</Box>
			</Stack>

			<Paper sx={{ p: 2, borderRadius: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
				<CategoryToolbar
					tab={tab}
					onTabChange={handleTabChange}
					search={debouncedSearch.trim()}
					onSearchChange={handleSearchChange}
					counts={counts}
					isFetching={isFetching}
				/>

				<CategoryTable
					totalItems={response?.total || 0}
					isLoading={isLoading}
					categories={response?.data ?? []}
					search={debouncedSearch}
					page={page}
					limit={limit}
					onPageChange={handlePageChange}
					onRowsPerPageChange={handleRowsPerPageChange}
					onDelete={handleButtonDeleteClick}
					onEdit={handleButtonEditClick}
				/>
			</Paper>
		</Box>
	);
}
