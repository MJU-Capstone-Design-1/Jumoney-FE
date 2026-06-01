import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type NewsItem = {
  newUrl: string;
  title: string;
  content: string;
  keyword: string;
};

export type NewsTodayResponse =
  | {
      success: true;
      code: 'NEWS200_OK';
      message: string;
      data: {
        baseTime: string;
        count: number;
        items: NewsItem[];
      };
    }
  | {
      success: false;
      code: 'NEWS404_NO_ANALYSIS' | 'NEWS500_LOAD_FAILED';
      message: string;
    };

// 간단한 인메모리 ETag 캐싱
let cachedETag: string | null = null;
let cachedData: Extract<NewsTodayResponse, { success: true }>['data'] | null =
  null;

export const fetchTodayNews = async () => {
  const headers: Record<string, string> = {};
  if (cachedETag) {
    headers['If-None-Match'] = cachedETag;
  }

  try {
    const res = await axios.get<NewsTodayResponse>('/api/news/today', {
      headers,
      validateStatus: (status) =>
        status === 200 || status === 304 || status === 404 || status === 500,
    });

    if (res.status === 304 && cachedData) {
      return cachedData;
    }

    const body = res.data;

    if (!body.success) {
      // 404: 분석 없음, 500: 로드 실패
      throw new Error(body.code);
    }

    const etag = res.headers['etag'];
    if (etag) {
      cachedETag = etag;
    }
    cachedData = body.data;

    return body.data;
  } catch (error) {
    throw error;
  }
};

export const useTodayNews = () => {
  return useQuery({
    queryKey: ['news', 'today'],
    queryFn: fetchTodayNews,
    staleTime: 5 * 60 * 1000, // 5분
    retry: (failureCount, error: Error) => {
      // 404 NO_ANALYSIS는 재시도하지 않음 (서버에 데이터가 없는 상태)
      if (error?.message === 'NEWS404_NO_ANALYSIS') {
        return false;
      }
      return failureCount < 2;
    },
  });
};
