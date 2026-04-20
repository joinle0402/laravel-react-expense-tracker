import axios, { type AxiosRequestConfig } from 'axios';
import { tokenStorage } from '@/common/utils/token.ts';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		Accept: 'application/json',
	},
});

api.interceptors.request.use((config) => {
	const token = tokenStorage.get();

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject(error),
);

export const http = {
	get: <T>(url: string, config?: AxiosRequestConfig) => api.get<T>(url, config).then((response) => response.data),
	post: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>) => api.post<T>(url, data, config).then((response) => response.data),
	put: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>) => api.put<T>(url, data, config).then((response) => response.data),
	patch: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>) =>
		api.patch<T>(url, data, config).then((response) => response.data),
	delete: <T>(url: string, config?: AxiosRequestConfig) => api.delete<T>(url, config).then((response) => response.data),
};
