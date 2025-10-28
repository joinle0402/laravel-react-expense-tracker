import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function joinpath(base: string, ...parts: (string | number | undefined)[]) {
	const clean = [base, ...parts.filter(Boolean)].join('/');
	return clean.replace(/([^:]\/)\/+/g, '$1');
}
