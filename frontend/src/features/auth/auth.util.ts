export function createAvatar(name?: string) {
	if (!name) return '';
	const words = name.trim().split(/\s+/);
	if (words.length === 1) return words[0].charAt(0).toUpperCase();
	return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export function getAvatarColor(name: string): string {
	let hash = 0;
	for (let i = 0; i < name.length; i++) {
		hash = name.charCodeAt(i) + ((hash << 5) - hash);
	}
	const hue = Math.abs(hash) % 360;
	return `hsl(${hue}, 65%, 55%)`;
}

export function readableTextOn(bgHsl: string) {
	const match = bgHsl.match(/hsl\(\s*([\d.]+)[^\d]+([\d.]+)%[^\d]+([\d.]+)%\s*\)/i);
	if (!match) return '#000';
	const l = parseFloat(match[3]);
	return l > 55 ? '#000000' : '#ffffff';
}
