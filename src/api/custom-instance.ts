// src/api/custom-instance.ts
import axios, { AxiosRequestConfig } from 'axios';
import { TokenRefreshResponse } from './generated/model/tokenRefreshResponse';

let accessToken = '';

export const setAccessToken = (token: string) => {
  accessToken = token;
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', token);
  }
};

export const getAccessToken = () => {
  if (!accessToken && typeof window !== 'undefined') {
    accessToken = localStorage.getItem('accessToken') || '';
  }
  return accessToken;
};

export const clearAccessToken = () => {
  accessToken = '';
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
  }
};

// 1. 기본 설정 (서버 주소, 타임아웃 등)
export const AXIOS_INSTANCE = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://jumoney.site',
  withCredentials: true,
});

// 2. 요청 가로채기 (여기에 토큰을 넣습니다)
AXIOS_INSTANCE.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 3. 응답 가로채기 (401 에러 발생 시 토큰 자동 재발급)
interface FailedRequest {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized 에러이고, 인터셉터에 의해 이미 처리되지 않은 요청이며, refresh 요청 자체가 아닌 경우
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/api/auth/refresh')
    ) {
      if (isRefreshing) {
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return AXIOS_INSTANCE(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // refresh API 직접 호출 (AXIOS_INSTANCE 대신 axios 인스턴스를 직접 구성하여 호출하여 무한 루프 예방)
        const response = await axios.post<TokenRefreshResponse>(
          `${AXIOS_INSTANCE.defaults.baseURL}/api/auth/refresh`,
          {},
          { withCredentials: true },
        );

        const newAccessToken = response.data.accessToken;
        if (newAccessToken) {
          setAccessToken(newAccessToken);
          AXIOS_INSTANCE.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);
          return AXIOS_INSTANCE(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearAccessToken();
        // 토큰 갱신 실패 시 메인 로그인 화면으로 이동시킬 수 있습니다.
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

// 4. Orval이 사용할 커스텀 함수
export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const promise = AXIOS_INSTANCE(config).then(({ data }) => data);

  return promise;
};
