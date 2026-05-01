import type { ButtonProps } from '@mui/material/Button';
import type { ReactNode } from 'react';
import type { DialogProps } from '@mui/material';

export type ConfirmDialogOptions = {
	title?: ReactNode;
	message?: ReactNode;
	warning?: ReactNode;
	confirmText?: string;
	cancelText?: string;
	confirmColor?: ButtonProps['color'];
	maxWidth?: DialogProps['maxWidth'];
	onConfirm?: () => void | Promise<unknown>;
};

export type ConfirmDialogValue = {
	confirm: (options: ConfirmDialogOptions) => Promise<boolean>;
	deleteConfirm: (options: ConfirmDialogOptions) => Promise<boolean>;
};

export type ConfirmDialogState = ConfirmDialogOptions & { open: boolean };
