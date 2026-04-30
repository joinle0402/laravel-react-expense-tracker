import { useState } from 'react';

export default function useStorageState(key: string, defaultValue: unknown = null) {
	const [value, setValue] = useState(() => {
		try {
			const saved = localStorage.getItem(key);
			return saved !== null ? JSON.parse(saved) : defaultValue;
		} catch {
			return defaultValue;
		}
	});

	const setStoreValue = (newValue: unknown) => {
		setValue((prevState: string) => {
			const valueToSave = typeof newValue === 'function' ? newValue(prevState) : newValue;
			localStorage.setItem(key, JSON.stringify(valueToSave));
			return valueToSave;
		});
	};

	return [value, setStoreValue];
}
