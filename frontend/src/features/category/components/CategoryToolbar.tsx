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
import type { ChangeEvent, SyntheticEvent } from 'react';
import type { CategoryTab, CategoryTabCounts } from '@/features/category/types/category.type';

interface CategoryToolbarProps {
	tab: string;
	onTabChange: (event: SyntheticEvent, value: CategoryTab) => void;
	counts?: CategoryTabCounts | undefined;
	search: string;
	onSearchChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => void;
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
		<Grid container spacing={2} sx={{ alignItems: 'center', mb: 1 }}>
			<Grid size={{ xs: 12, md: 6 }}>
				<Tabs
					value={tab}
					onChange={onTabChange}
					sx={{
						minHeight: 44,
						height: 44,

						'& .MuiTabs-indicator': {
							height: 3,
							borderRadius: 999,
						},

						'& .MuiTab-root': {
							minHeight: 44,
							height: 44,
							textTransform: 'none',
							fontWeight: 700,
							color: 'text.secondary',
						},

						'& .Mui-selected': {
							color: 'primary.main',
						},
					}}
				>
					{tabs.map(item => (
						<Tab
							key={item.value}
							value={item.value}
							label={
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
									<Typography variant="body2" sx={{ fontWeight: 700 }}>
										{item.label}
									</Typography>
									{counts && (
										<Box
											component="span"
											sx={{
												minWidth: 22,
												height: 22,
												px: 0.75,
												borderRadius: 999,
												bgcolor: tab === item.value ? 'primary.700' : 'action.hover',
												color: tab === item.value ? 'primary.main' : 'text.secondary',
												fontSize: 12,
												fontWeight: 700,
												display: 'inline-flex',
												alignItems: 'center',
												justifyContent: 'center',
												lineHeight: 1,
											}}
										>
											{counts[item.value] || 0}
										</Box>
									)}
								</Box>
							}
						/>
					))}
				</Tabs>
			</Grid>
			<Grid size={{ xs: 12, md: 6 }}>
				<Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-end', minHeight: 38 }}>
					<TextField
						fullWidth
						size="small"
						placeholder="Tìm kiếm danh mục..."
						value={search}
						onChange={onSearchChange}
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
						sx={{
							flex: 1,
							maxWidth: 560,
							minWidth: 260,

							'& .MuiInputBase-root': {
								height: 38,
							},
						}}
					/>
					<Button variant="contained" startIcon={<AddIcon />} sx={{ minHeight: 38 }}>
						Tạo danh mục
					</Button>
				</Stack>
			</Grid>
		</Grid>
	);
}
