import type { Theme } from '@mui/material';
export function getAvatarShortName(fullname?: string | null) {
	if (!fullname?.trim()) return '?';
	const words = fullname.trim().split(/\s+/).filter(Boolean);
	if (words.length === 1) return words[0].trim().toUpperCase();
	return `${words[0].charAt(0)}${words[words.length - 1].charAt(0)}`.toUpperCase();
}

export function getAvatarColor(theme: Theme, seed?: string | number | null): string {
	if (!seed) return theme.palette.primary.main;
	const paletteKeys = ['primary', 'secondary', 'success', 'error', 'warning', 'info'] as const;

	const text = String(seed);

	let hash = 0;

	for (let i = 0; i < text.length; i++) {
		hash = text.charCodeAt(i) + ((hash << 5) - hash);
	}

	const index = Math.abs(hash) % paletteKeys.length;
	const key = paletteKeys[index];

	return theme.palette[key].main;
}
