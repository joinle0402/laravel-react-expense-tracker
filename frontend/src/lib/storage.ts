const ACCESS_TOKEN_KEY = 'access_token';

export const tokenStore = {
	get access() {
		return localStorage.getItem(ACCESS_TOKEN_KEY);
	},
	set access(token: string | null) {
		if (token) {
			localStorage.setItem(ACCESS_TOKEN_KEY, token);
		} else {
			localStorage.removeItem(ACCESS_TOKEN_KEY);
		}
	}
};
