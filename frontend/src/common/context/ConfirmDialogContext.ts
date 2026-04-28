import { createContext } from 'react';
import type { ConfirmDialogValue } from '@/common/type/confirm-dialog.type.ts';

export const ConfirmDialogContext = createContext<ConfirmDialogValue | null>(null);
