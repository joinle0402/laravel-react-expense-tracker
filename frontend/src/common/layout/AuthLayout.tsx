import type { PropsWithChildren } from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';

interface AuthLayoutProps extends PropsWithChildren {
	title?: string;
	subtitle?: string;
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
	return (
		<Container maxWidth="sm">
			<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
				<Paper elevation={3} sx={{ width: '100%', p: 4 }}>
					<Typography variant="h4" align="center" sx={{ fontWeight: 700 }}>
						{title}
					</Typography>
					{subtitle && (
						<Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 2 }}>
							{subtitle}
						</Typography>
					)}
					{children}
				</Paper>
			</Box>
		</Container>
	);
}
