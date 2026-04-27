import type { ReactNode } from 'react';
import { useLocation, Link as NavLink } from 'react-router-dom';
import { AccountBalanceWallet, Category, Dashboard, ReceiptLong, Settings } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import { DRAWER_WIDTH_CLOSED, DRAWER_WIDTH_OPEN } from '@/common/contants/layout.contants.ts';
import { getStoredUser } from '@/features/auth/store/auth-store.ts';
import { getAvatarColor, getAvatarShortName } from '@/common/utils/avatar.ts';
import { useTheme } from '@mui/material';

type SidebarItem = {
	label: string;
	path: string;
	icon: ReactNode;
};

const sidebarItems: SidebarItem[] = [
	{
		label: 'Dashboard',
		path: '/admin/dashboard',
		icon: <Dashboard />,
	},
	{
		label: 'Transactions',
		path: '/admin/transactions',
		icon: <ReceiptLong />,
	},
	{
		label: 'Categories',
		path: '/admin/categories',
		icon: <Category />,
	},
	{
		label: 'Budgets',
		path: '/admin/budgets',
		icon: <AccountBalanceWallet />,
	},
	{
		label: 'Settings',
		path: '/admin/settings',
		icon: <Settings />,
	},
];

interface SidebarProps {
	open: boolean;
}

export default function Sidebar({ open }: SidebarProps) {
	const theme = useTheme();
	const location = useLocation();
	const drawerWidth = open ? DRAWER_WIDTH_OPEN : DRAWER_WIDTH_CLOSED;
	const userProfile = getStoredUser();
	return (
		<Box
			component="nav"
			sx={{
				width: {
					lg: drawerWidth,
				},
				flexShrink: {
					lg: 0,
				},
			}}
		>
			<Drawer
				variant="permanent"
				open
				sx={{
					display: {
						xs: 'none',
						lg: 'block',
					},
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
						borderRight: '1px solid',
						borderColor: 'divider',
					},
				}}
			>
				<Box
					sx={{
						minHeight: '100vh',
						bgcolor: 'background.paper',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Toolbar
						sx={{
							minHeight: '72px !important',
							px: open ? 2 : '12px!important',
							display: 'flex',
							alignItems: 'center',
							justifyContent: open ? 'inherit' : 'center',
							gap: 1.5,
						}}
					>
						<Box
							sx={{
								width: 40,
								height: 40,
								borderRadius: open ? 2 : 1,
								bgcolor: 'primary.main',
								color: 'primary.contrastText',
								display: 'grid',
								placeItems: 'center',
								fontWeight: 800,
								fontSize: 18,
							}}
						>
							E
						</Box>

						{open && (
							<Box>
								<Typography sx={{ fontWeight: 800, lineHeight: '1.2' }}>Expense Tracker</Typography>
								<Typography variant="caption" color="text.secondary">
									Admin Panel
								</Typography>
							</Box>
						)}
					</Toolbar>
					<Divider />
					<Box sx={{ flex: 1, px: 1.5, py: 2 }}>
						<List disablePadding>
							{sidebarItems.map(item => {
								const active =
									item.path === '/dashboard'
										? location.pathname === '/' || location.pathname === '/dashboard'
										: location.pathname.startsWith(item.path);
								return (
									<ListItemButton
										key={item.path}
										component={NavLink}
										to={item.path}
										sx={{
											mb: 0.75,
											borderRadius: 2,
											minHeight: 46,
											color: active ? 'primary.main' : 'text.secondary',
											bgcolor: active ? 'action.selected' : 'transparent',
											'&:hover': {
												bgcolor: active ? 'action.selected' : 'action.hover',
											},
											'& .MuiListItemIcon-root': {
												color: active ? 'primary.main' : 'text.secondary',
												minWidth: 40,
											},
										}}
									>
										<ListItemIcon>{item.icon}</ListItemIcon>
										{open && <ListItemText>{item.label}</ListItemText>}
									</ListItemButton>
								);
							})}
						</List>
					</Box>
					<Divider />
					<Box sx={{ p: 1 }}>
						<Box
							sx={{
								p: 1.5,
								borderRadius: 2,
								bgcolor: 'grey.50',
								display: 'flex',
								alignItems: 'center',
								gap: 1.25,
							}}
						>
							<Avatar sx={{ width: 36, height: 36, bgcolor: getAvatarColor(theme, userProfile?.name) }}>
								{getAvatarShortName(userProfile?.name)}
							</Avatar>
							{open && (
								<Box sx={{ minWidth: 0 }}>
									<Typography sx={{ fontWeight: 700, fontSize: 14 }} noWrap>
										{userProfile?.name}
									</Typography>
									<Typography variant="caption" color="text.secondary" noWrap>
										{userProfile?.email}
									</Typography>
								</Box>
							)}
						</Box>
					</Box>
				</Box>
			</Drawer>
		</Box>
	);
}
