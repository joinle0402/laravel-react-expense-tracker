import { Box, Button, Container, Stack, Typography, Paper } from '@mui/material';
import { Home, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<Container>
			<Box
				sx={{
					minHeight: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					py: 4,
				}}
			>
				<Paper
					elevation={0}
					sx={{
						width: '100%',
						p: { xs: 4, md: 6 },
						textAlign: 'center',
						borderRadius: 4,
						border: '1px solid',
						borderColor: 'divider',
						bgcolor: 'background.paper',
					}}
				>
					<Stack spacing={3} sx={{ alignItems: 'center' }}>
						<Typography
							variant="h1"
							sx={{
								fontSize: { xs: 96, md: 140 },
								fontWeight: 800,
								lineHeight: 1,
								color: 'primary.main',
								letterSpacing: -6,
							}}
						>
							404
						</Typography>

						<Stack spacing={1}>
							<Typography variant="h4" sx={{ fontWeight: '700' }}>
								Không tìm thấy trang
							</Typography>

							<Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480 }}>
								Trang bạn đang truy cập không tồn tại, đã bị xoá hoặc bạn không có quyền truy cập.
							</Typography>
						</Stack>

						<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
							<Button variant="contained" size="large" startIcon={<Home />} onClick={() => navigate('/admin/dashboard')}>
								Về dashboard
							</Button>

							<Button variant="outlined" size="large" startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
								Quay lại
							</Button>
						</Stack>
					</Stack>
				</Paper>
			</Box>
		</Container>
	);
}
