import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Sidebar from '@/common/components/Sidebar.tsx';
import Header from '@/common/components/Header.tsx';
import { DRAWER_WIDTH_CLOSED, DRAWER_WIDTH_OPEN, HEADER_HEIGHT } from '@/common/contants/layout.contants.ts';
import useStorageState from '@/common/hooks/useStorageState.ts';

export default function AdminLayout() {
	const [sidebarOpen, setSidebarOpen] = useStorageState('sidebarOpen', false);
	const sidebarWidth = sidebarOpen ? DRAWER_WIDTH_OPEN : DRAWER_WIDTH_CLOSED;
	const handleToggleSidebarOpen = () => setSidebarOpen((isSidebarOpen: boolean) => !isSidebarOpen);

	return (
		<Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', bgcolor: 'grey.100' }}>
			<Sidebar open={sidebarOpen} />
			<Header sidebarOpen={sidebarOpen} onToggleSidebar={handleToggleSidebarOpen} sidebarWidth={sidebarWidth} />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					width: `calc(100% - ${sidebarWidth}px)`,
					height: '100vh',
					pt: `${HEADER_HEIGHT}px`,
					transition: theme =>
						theme.transitions.create(['width', 'margin-left'], {
							easing: theme.transitions.easing.sharp,
							duration: theme.transitions.duration.standard,
						}),
				}}
			>
				<Box sx={{ height: `calc(100vh - ${HEADER_HEIGHT}px)`, overflow: 'auto', p: 2 }}>
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
}
