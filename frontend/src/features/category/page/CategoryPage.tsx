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
import useDeleteCategory from '@/features/category/hooks/useDeleteCategory.ts';
import CategoryDialog from '@/features/category/components/CategoryDialog.tsx';
import UseBulkDeleteCategories from '@/features/category/hooks/useBulkDeleteCategories.ts';

export default function CategoryPage() {
	const [tab, setTab] = useState<CategoryTab>('all');
	const [search, setSearch] = useState<string>('');
	const [page, setPage] = useState<number>(0);
	const [limit, setLimit] = useState<number>(10);
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const [editCategory, setEditCategory] = useState<Category | null>(null);
	const [selectedIds, setSelectedIds] = useState<number[]>([]);

	const debouncedSearch = useDebounce(search.trim());
	const { data: response, isLoading, isFetching } = useCategories({ tab, search: debouncedSearch.trim(), page: page + 1, limit });
	const { mutateAsync: deleteCategory } = useDeleteCategory();
	const { mutateAsync: bulkDeleteCategories } = UseBulkDeleteCategories();
	const { deleteConfirm } = useConfirmDialog();
	const counts = response?.meta?.counts;

	const handlePageChange = (_event: MouseEvent<HTMLButtonElement> | null, page: number) => {
		setPage(page);
		setSelectedIds([]);
	};

	const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
		setLimit(parseInt(event.target.value, 10));
		setPage(0);
		setSelectedIds([]);
	};

	const handleTabChange = (_event: SyntheticEvent, value: CategoryTab) => {
		setTab(value);
		setPage(0);
		setSelectedIds([]);
	};

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setSearch(event.target.value);
		setPage(0);
	};

	const handleDeleteClick = async (category: Category) => {
		await deleteConfirm({ title: `Xóa danh mục "${category.name}"?`, onConfirm: () => deleteCategory(category.id) });
	};

	const handleCreateClick = () => {
		setOpenDialog(true);
		setEditCategory(null);
	};

	const handleEditClick = async (category: Category) => {
		setOpenDialog(true);
		setEditCategory(category);
	};

	const handleSelectOne = (id: number) => {
		setSelectedIds(prev => (prev.includes(id) ? prev.filter(selectedId => selectedId !== id) : [...prev, id]));
	};

	const handleSelectAll = (checked: boolean, ids: number[]) => {
		setSelectedIds(prev => (checked ? Array.from(new Set([...prev, ...ids])) : prev.filter(id => !ids.includes(id))));
	};

	const handleBulkDelete = async () => {
		if (selectedIds.length === 0) return;
		await deleteConfirm({
			title: `Bạn có chắc muốn xóa ${selectedIds.length} danh mục đã chọn không?`,
			onConfirm: () => bulkDeleteCategories(selectedIds),
		});
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
					search={search}
					onSearchChange={handleSearchChange}
					counts={counts}
					isFetching={isFetching}
					onCreate={handleCreateClick}
				/>

				<CategoryTable
					totalItems={response?.total ?? 0}
					isLoading={isLoading}
					categories={response?.data ?? []}
					search={search}
					page={page}
					limit={limit}
					selectedIds={selectedIds}
					onPageChange={handlePageChange}
					onRowsPerPageChange={handleRowsPerPageChange}
					onDelete={handleDeleteClick}
					onEdit={handleEditClick}
					onSelectOne={handleSelectOne}
					onSelectAll={handleSelectAll}
					onBulkDelete={handleBulkDelete}
				/>
			</Paper>

			<CategoryDialog
				open={openDialog}
				mode={editCategory ? 'update' : 'create'}
				initialValues={editCategory}
				lockType={!!editCategory}
				onClose={() => setOpenDialog(false)}
				onConfirm={() => setPage(0)}
			/>
		</Box>
	);
}
