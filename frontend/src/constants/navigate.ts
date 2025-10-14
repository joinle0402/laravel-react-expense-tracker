import { Home, Wallet, FolderKanban, CreditCard, BarChart2, Settings, Banknote, RefreshCw } from 'lucide-react';

export const SIDEBAR_NAV = [
	{ label: 'Tổng quan', to: '/admin/dashboard', icon: Home },
	{ label: 'Giao dịch', to: '/admin/transactions', icon: Wallet },
	{ label: 'Danh mục', to: '/admin/categories', icon: FolderKanban },
	{ label: 'Tài khoản', to: '/admin/accounts', icon: CreditCard },
	{ label: 'Ngân sách', to: '/admin/budgets', icon: Banknote },
	{ label: 'Báo cáo', to: '/admin/reports', icon: BarChart2 },
	{ label: 'Đồng bộ ngân hàng', to: '/admin/bank-sync', icon: RefreshCw },
	{ label: 'Cài đặt', to: '/admin/settings', icon: Settings }
] as const;

export const TITLE_BY_PATH: Record<string, string> = {
	'/': 'Tổng quan',
	'/transactions': 'Giao dịch',
	'/categories': 'Danh mục',
	'/accounts': 'Tài khoản',
	'/budgets': 'Ngân sách',
	'/reports': 'Báo cáo',
	'/bank-sync': 'Đồng bộ ngân hàng',
	'/settings': 'Cài đặt'
};
