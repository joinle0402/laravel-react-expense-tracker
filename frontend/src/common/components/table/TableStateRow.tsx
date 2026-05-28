import type { ReactNode } from 'react';
import { type SxProps, type Theme } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';

interface TableStateRowProps {
	colSpan: number;
	children: ReactNode;
	sx?: SxProps<Theme>;
}

export default function TableStateRow({ colSpan, children, sx }: TableStateRowProps) {
	return (
		<TableRow>
			<TableCell colSpan={colSpan} align="center">
				<Box
					sx={{
						py: 6,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 1,
						...sx,
					}}
				>
					{children}
				</Box>
			</TableCell>
		</TableRow>
	);
}
