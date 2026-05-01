import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import LoaddingRow from '@/common/components/table/LoaddingRow.tsx';
import EmptyRow from '@/common/components/table/EmptyRow.tsx';
import type { Category } from '@/features/category/types/category.type.ts';
import CategoryTableRow from '@/features/category/components/CategoryTableRow.tsx';

interface CategoryTableProps {
	isLoading: boolean;
	categories: Category[];
	search: string;
	onDelete: (category: Category) => void;
	onEdit: (category: Category) => void;
}

const tableHeadCellStyle = {
	bgcolor: '#F8FAFC',
	fontWeight: 700,
	fontSize: 12,
	color: 'text.secondary',
	textTransform: 'uppercase',
};

export default function CategoryTable({ categories, isLoading, search, onDelete, onEdit }: CategoryTableProps) {
	return (
		<Grid container>
			<Grid size={12}>
				<TableContainer component={Paper} variant="elevation" sx={{ maxHeight: 'calc(100vh - 360px)' }}>
					<Table stickyHeader size="small">
						<TableHead>
							<TableRow>
								<TableCell sx={{ ...tableHeadCellStyle, minWidth: '10px' }}>#</TableCell>
								<TableCell sx={{ ...tableHeadCellStyle, minWidth: '35%' }}>Tên danh mục</TableCell>
								<TableCell sx={{ ...tableHeadCellStyle, minWidth: '160px' }}>Loại </TableCell>
								<TableCell sx={{ ...tableHeadCellStyle, minWidth: '160px' }}>Nguồn</TableCell>
								<TableCell sx={{ ...tableHeadCellStyle, minWidth: '160px' }}>Trạng thái</TableCell>
								<TableCell sx={{ ...tableHeadCellStyle, minWidth: '100px' }} align="right">
									Hành động
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{isLoading ? (
								<LoaddingRow colSpan={6} />
							) : categories?.length == 0 ? (
								<EmptyRow colSpan={6} search={search} />
							) : (
								categories?.map((category: Category, index: number) => (
									<CategoryTableRow key={category.id} index={index} category={category} onDelete={onDelete} onEdit={onEdit} />
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
		</Grid>
	);
}
