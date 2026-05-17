export function formatCurrency(value: number | null | undefined) {
	if (value === null || value === undefined) return '';
	return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}

export function parseCurrency(value: string) {
	const raw = value.replace(/\D/g, '');
	if (!raw) return null;
	return Number(raw);
}

export function formatDate(value: string, fallback = '-') {
	if (!value) return fallback;
	if (Number.isNaN(new Date(value).getTime())) return fallback;
	return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(value));
}
