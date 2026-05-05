type FormDataValue = string | number | boolean | File | Blob | null | undefined;

export function objectToFormData<T extends Record<string, FormDataValue>>(data: T) {
	const formData = new FormData();
	Object.entries(data).forEach(([key, value]) => {
		if (value === undefined || value === null) return;
		formData.append(key, value instanceof Blob ? value : String(value));
	});
	return formData;
}
