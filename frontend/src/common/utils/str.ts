export function uppercaseFirst(str: string) {
	if (!str) return '';
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function joinPath(...paths: Array<string | number>): string {
	return paths
		.map(path => String(path).trim())
		.filter(Boolean)
		.map((path, index) => {
			if (index === 0) {
				return path.replace(/\/+$/g, '');
			}

			return path.replace(/^\/+|\/+$/g, '');
		})
		.join('/');
}
