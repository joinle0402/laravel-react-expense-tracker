import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Menu as MenuIcon } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import UserMenu from '@/common/components/UserMenu.tsx';

interface HeaderProps {
	sidebarOpen: boolean;
	sidebarWidth: number;
	onToggleSidebar: () => void;
}

export default function Header({ sidebarOpen, sidebarWidth, onToggleSidebar }: HeaderProps) {
	return (
		<AppBar
			position="fixed"
			elevation={0}
			sx={{
				width: {
					lg: `calc(100% - ${sidebarWidth}px)`,
				},
				ml: {
					lg: `${sidebarWidth}px`,
				},
				bgcolor: 'background.paper',
				color: 'text.primary',
				borderBottom: '1px solid',
				borderColor: 'divider',
			}}
		>
			<Toolbar
				variant="dense"
				sx={{
					px: {
						xs: 2,
						sm: 3,
					},
					display: 'flex',
					justifyContent: 'space-between',
					gap: 2,
				}}
			>
				<Tooltip title={sidebarOpen ? 'Thu nhỏ' : 'Phóng to'}>
					<IconButton size="small" edge="start" onClick={onToggleSidebar}>
						<MenuIcon />
					</IconButton>
				</Tooltip>

				<UserMenu></UserMenu>
			</Toolbar>
		</AppBar>
	);
}
