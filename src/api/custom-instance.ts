// src/api/custom-instance.ts
import axios, { AxiosRequestConfig } from 'axios';

// 1. 기본 설정 (서버 주소, 타임아웃 등)
export const AXIOS_INSTANCE = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
});

// 2. 요청 가로채기 (여기에 토큰을 넣습니다)
AXIOS_INSTANCE.interceptors.request.use((config) => {
  // 예: const token = localStorage.getItem('token');
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 3. Orval이 사용할 커스텀 함수
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
  }).then(({ data }) => data);

  return promise;
};
