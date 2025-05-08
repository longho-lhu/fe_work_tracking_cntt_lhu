// services/axiosCustom.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class AxiosCustom {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request Interceptor – kiểm tra token trước khi gửi
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('wt-accessToken');

        // 👉 Nếu không có token → redirect luôn
        // if (!token && typeof window !== 'undefined') {
        //   window.location.href = '/auth/login';
        //   return Promise.reject(new Error('Chưa đăng nhập'));
        // }

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor – nếu trả về 401 → logout
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response?.status === 401 && typeof window !== 'undefined') {
          localStorage.removeItem('wt-accessToken'); // ← Xoá token nếu có
          window.location.href = '/auth/login';
        }
        return Promise.reject(error);
      }
    );
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }
}

export default new AxiosCustom();
