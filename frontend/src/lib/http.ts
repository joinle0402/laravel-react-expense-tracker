import axios, { AxiosError, AxiosHeaders, type InternalAxiosRequestConfig, type AxiosRequestConfig, type AxiosRequestHeaders } from 'axios';
import { tokenStore } from '@/lib/storage.ts';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const client = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
	headers: new AxiosHeaders({ 'Content-Type': 'application/json' })
});

client.defaults.xsrfCookieName = 'XSRF-TOKEN';
client.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

async function ensureCsrf() {
	await client.get('http://localhost:8000/sanctum/csrf-cookie');
}

let isRefreshing = false;
let refreshQueue: Array<(token: string | null) => void> = [];
const onTokenRefreshed = (token: string | null) => {
	refreshQueue.forEach((cb) => cb(token));
	refreshQueue = [];
};

const ensureHeaders = (h?: AxiosRequestHeaders) => (h instanceof AxiosHeaders ? h : new AxiosHeaders(h));

client.interceptors.request.use((config) => {
	const token = tokenStore.access;
	if (token) {
		config.headers = config.headers ?? {};
		config.headers['Authorization'] = `Bearer ${token}`;
	}
	return config;
});

client.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const original = error.config as InternalAxiosRequestConfig | undefined;
		const skip = original?.url?.includes('/logout') || original?.url?.includes('/refresh');
		if (!original || (error.response?.status !== 401 && error.response?.status !== 419) || skip) {
			return Promise.reject(error);
		}

		if (error.response?.status === 419 && !(original as any)._retry) {
			(original as any)._retry = true;
			await ensureCsrf();
			return client(original);
		}

		if (isRefreshing) {
			return new Promise((resolve, reject) => {
				refreshQueue.push((newToken) => {
					if (!newToken) return reject(error);
					const headers = ensureHeaders(original.headers);
					headers.set('Authorization', `Bearer ${newToken}`);
					original.headers = headers;
					resolve(client(original));
				});
			});
		}

		isRefreshing = true;
		try {
			await ensureCsrf();
			const response = await axios.post(
				`${BASE_URL}/auth/refresh`,
				{},
				{
					timeout: 10_000,
					withCredentials: true,
					headers: new AxiosHeaders({ 'Content-Type': 'application/json' })
				}
			);
			const newAccess: string | undefined = response.data?.access_token;
			tokenStore.access = newAccess ?? null;

			onTokenRefreshed(newAccess ?? null);
			if (newAccess) {
				const headers = ensureHeaders(original.headers);
				headers.set('Authorization', `Bearer ${newAccess}`);
				original.headers = headers;
				return client(original);
			}
		} catch (e) {
			tokenStore.access = null;
			onTokenRefreshed(null);
			return Promise.reject(e);
		} finally {
			isRefreshing = false;
		}
	}
);

export const http = {
	async get<T = unknown>(url: string, config?: AxiosRequestConfig) {
		const response = await client.get<T>(url, config);
		return response.data;
	},
	async post<T = unknown, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) {
		const response = await client.post<T>(url, body, config);
		return response.data;
	},
	async put<T = unknown, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) {
		const response = await client.put<T>(url, body, config);
		return response.data;
	},
	async patch<T = unknown, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) {
		const response = await client.patch<T>(url, body, config);
		return response.data;
	},
	async delete<T = unknown>(url: string, config?: AxiosRequestConfig) {
		const response = await client.delete<T>(url, config);
		return response.data;
	}
};
