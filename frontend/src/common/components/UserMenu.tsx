import { useState } from 'react';
import type { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearAuth, getStoredUser } from '@/features/auth/store/auth-store.ts';
import { useMutation } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Logout, Person, Settings } from '@mui/icons-material';
import { getAvatarColor, getAvatarShortName } from '@/common/utils/avatar.ts';
import { useTheme } from '@mui/material';
import { toast } from '@/common/libs/toast.ts';
import { authApi } from '@/features/auth/api/auth.api.ts';

export default function UserMenu() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const theme = useTheme();
	const navigate = useNavigate();
	const isOpen = Boolean(anchorEl);
	const userProfile = getStoredUser();
	const logoutMutation = useMutation({
		mutationFn: authApi.logout,
	});

	const handleOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);
	const handleButtonLogoutClick = () => {
		logoutMutation.mutate(undefined, {
			onSettled: () => {
				clearAuth();
				navigate('/login', { replace: true });
				toast.success('Đăng xuất tài khoản thành công');
			},
		});
	};

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: 1.25,
				cursor: 'pointer',
				px: 1,
				py: 0.75,
				borderRadius: 2,
				'&:hover': {
					bgcolor: 'action.hover',
				},
			}}
		>
			<IconButton size="small" onClick={handleOpen}>
				<Avatar sx={{ width: 36, height: 36, bgcolor: getAvatarColor(theme, userProfile?.name) }}>
					{getAvatarShortName(userProfile?.name)}
				</Avatar>
			</IconButton>

			<Menu
				anchorEl={anchorEl}
				open={isOpen}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<Box sx={{ px: 2, py: 1.5 }}>
					<Typography sx={{ fontWeight: '700', fontSize: 14 }}>{userProfile?.name || 'Username'}</Typography>
					<Typography variant="caption" color="text.secondary">
						{userProfile?.email || 'admin@example.com'}
					</Typography>
				</Box>

				<Divider />

				<MenuItem onClick={() => navigate('/profile')}>
					<ListItemIcon>
						<Person fontSize="small" />
					</ListItemIcon>
					Profile
				</MenuItem>

				<MenuItem onClick={() => navigate('/settings')}>
					<ListItemIcon>
						<Settings fontSize="small" />
					</ListItemIcon>
					Settings
				</MenuItem>

				<Divider />

				<MenuItem
					onClick={handleButtonLogoutClick}
					disabled={logoutMutation.isPending}
					sx={{
						color: 'error.main',
						'& .MuiListItemIcon-root': {
							color: 'error.main',
						},
					}}
				>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					Đăng xuất
				</MenuItem>
			</Menu>
		</Box>
	);
}
