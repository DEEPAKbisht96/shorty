import axios, { AxiosError, AxiosRequestConfig } from 'axios';

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
    refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
    refreshSubscribers.forEach(cb => cb(token));
    refreshSubscribers = [];
};

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/api/v1`,
    withCredentials: true,
});

api.interceptors.response.use(
    res => res,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;

                try {
                    const res = await api.get('/auth/refresh', {
                        withCredentials: true,
                    });
                    const newToken = res.data.token;

                    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                    onRefreshed(newToken);
                    // @ts-ignore
                } catch (refreshError: AxiosError) {
                    console.log("Error refreshing the token...", refreshError);

                    // Handle 403 - Invalid Refresh Token
                    if (refreshError.response?.status === 403) {
                        window.location.href = '/auth/logout';
                        return;
                    }

                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }

            }

            return new Promise(resolve => {
                subscribeTokenRefresh(token => {
                    originalRequest.headers = {
                        ...originalRequest.headers,
                        Authorization: `Bearer ${token}`,
                    };
                    resolve(api(originalRequest));
                });
            });
        }

        return Promise.reject(error);
    }
);

export default api;
