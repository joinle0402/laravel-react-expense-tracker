import { type ReactNode, useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import type { ConfirmDialogOptions, ConfirmDialogState } from '@/common/type/confirm-dialog.type.ts';
import { ConfirmDialogContext } from '@/common/context/ConfirmDialogContext';

const defaultState: ConfirmDialogState = {
	open: false,
	title: '',
	message: '',
	warning: '',
	confirmText: 'Xác nhận',
	cancelText: 'Hủy',
	confirmColor: 'primary',
	maxWidth: 'xs',
};

export default function ConfirmDialogProvider({ children }: { children: ReactNode }) {
	const [state, setState] = useState<ConfirmDialogState>(defaultState);
	const resolverRef = useRef<((value: boolean) => void) | null>(null);
	const confirm = (options: ConfirmDialogOptions) => {
		setState({ ...defaultState, ...options, open: true });
		return new Promise<boolean>(resolve => {
			resolverRef.current = resolve;
		});
	};
	const deleteConfirm = (options: ConfirmDialogOptions) => {
		return confirm({
			title: 'Xoá thông tin',
			message: 'Bạn có muốn xoá nội dung này?',
			confirmText: 'Xoá',
			confirmColor: 'error',
			...options,
		});
	};

	const handleButtonCloseClick = () => {
		resolverRef.current?.(false);
		resolverRef.current = null;
		setState(prevState => ({ ...prevState, open: false }));
	};
	const handleButtonConfirmClick = () => {
		resolverRef.current?.(true);
		resolverRef.current = null;
		setState(prevState => ({ ...prevState, open: false }));
	};

	return (
		<ConfirmDialogContext.Provider value={{ confirm, deleteConfirm }}>
			{children}
			<Dialog open={state.open} onClose={handleButtonCloseClick} fullWidth maxWidth={state.maxWidth}>
				<DialogTitle sx={{ fontWeight: 600 }}>{state.title}</DialogTitle>
				<DialogContent sx={{ pt: 1 }}>
					{state.warning && (
						<Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>
							{state.warning}
						</Alert>
					)}
					{state.message && (
						<Typography variant="body2" color="text.secondary">
							{state.message}
						</Typography>
					)}
				</DialogContent>
				<DialogActions sx={{ px: 3, pb: 2 }}>
					<Button onClick={handleButtonCloseClick}>{state.cancelText}</Button>

					<Button color={state.confirmColor} variant="contained" onClick={handleButtonConfirmClick}>
						{state.confirmText}
					</Button>
				</DialogActions>
			</Dialog>
		</ConfirmDialogContext.Provider>
	);
}
