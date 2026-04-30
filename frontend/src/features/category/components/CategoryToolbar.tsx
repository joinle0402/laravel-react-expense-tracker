import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import type { Dispatch, SetStateAction } from 'react';
import type { CategoryTab, CategoryTabCounts } from '@/features/category/types/category.type';

interface CategoryToolbarProps {
	tab: string;
	onTabChange: Dispatch<SetStateAction<CategoryTab>>;
	counts?: CategoryTabCounts | undefined;
	search: string;
	onSearchChange: Dispatch<SetStateAction<string>>;
	isFetching: boolean;
}

export default function CategoryToolbar({ tab, onTabChange, counts, search, onSearchChange, isFetching }: CategoryToolbarProps) {
	const tabs = [
		{ value: 'all', label: 'Tất cả' },
		{ value: 'expense', label: 'Chi tiêu' },
		{ value: 'income', label: 'Thu nhập' },
		{ value: 'deleted', label: 'Đã xóa' },
	] as const;

	return (
		<Grid container spacing={2} sx={{ alignItems: 'center' }}>
			<Grid size={6}>
				<Tabs value={tab} onChange={(_, value) => onTabChange(value)} sx={{ mb: 2 }}>
					{tabs.map(item => (
						<Tab
							key={item.value}
							value={item.value}
							label={
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
									<Typography variant="body2" sx={{ fontWeight: 600 }}>
										{item.label}
									</Typography>
									{counts && (
										<Typography
											variant="caption"
											sx={{
												px: 0.75,
												py: 0.15,
												borderRadius: 10,
												bgcolor: 'action.hover',
												color: 'text.secondary',
												fontWeight: 600,
												lineHeight: 1.4,
											}}
										>
											{counts[item.value] || 0}
										</Typography>
									)}
								</Box>
							}
						/>
					))}
				</Tabs>
			</Grid>
			<Grid size={6}>
				<Stack direction="row" spacing={1} sx={{ alignItems: 'center', minHeight: 40 }}>
					<TextField
						fullWidth
						size="small"
						placeholder="Tìm kiếm danh mục..."
						value={search}
						onChange={e => onSearchChange(e.target.value)}
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon fontSize="small" />
									</InputAdornment>
								),
								endAdornment: isFetching ? (
									<InputAdornment position="end">
										<CircularProgress size={18} />
									</InputAdornment>
								) : null,
							},
						}}
						sx={{ flex: 1, minWidth: 260 }}
					/>
					<Button variant="contained" startIcon={<AddIcon />} sx={{ minHeight: 40 }}>
						Tạo danh mục
					</Button>
				</Stack>
			</Grid>
		</Grid>
	);
}
