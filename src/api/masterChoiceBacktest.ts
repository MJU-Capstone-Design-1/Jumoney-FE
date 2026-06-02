import { useQuery } from '@tanstack/react-query';

import { customInstance } from './custom-instance';
import type { MasterChoiceRequest } from './generated/model';

export interface MasterChoiceBacktestDailyResult {
  date?: string;
  matched?: boolean;
}

export interface MasterChoiceBacktestDataWarning {
  date?: string;
  code?: string;
  message?: string;
}

export interface MasterChoiceBacktestResponse {
  masterId?: number;
  masterCode?: 'WARREN_BUFFETT' | 'PETER_LYNCH' | 'RAY_DALIO' | 'WILLIAM_ONEIL';
  stockCode?: string;
  fromDate?: string;
  toDate?: string;
  selectedLogicCodes?: string[];
  dailyResults?: MasterChoiceBacktestDailyResult[];
  dataWarnings?: MasterChoiceBacktestDataWarning[];
}

export interface ApiResponseMasterChoiceBacktestResponse {
  success?: boolean;
  code?: string;
  message?: string;
  data?: MasterChoiceBacktestResponse;
}

export const getMasterChoiceBacktest = (
  masterId: number,
  stockCode: string,
  masterChoiceRequest: MasterChoiceRequest,
  signal?: AbortSignal,
) => {
  return customInstance<ApiResponseMasterChoiceBacktestResponse>({
    url: `/api/master-choice/masters/${masterId}/backtests/stocks/${stockCode}`,
    method: 'POST',
    data: masterChoiceRequest,
    signal,
  });
};

export const getMasterChoiceBacktestQueryKey = (
  masterId: number | null,
  stockCode: string,
  masterChoiceRequest: MasterChoiceRequest,
) =>
  [
    '/api/master-choice/backtests',
    masterId,
    stockCode,
    masterChoiceRequest,
  ] as const;

export const useGetMasterChoiceBacktest = (
  masterId: number | null,
  stockCode: string,
  masterChoiceRequest: MasterChoiceRequest,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: getMasterChoiceBacktestQueryKey(
      masterId,
      stockCode,
      masterChoiceRequest,
    ),
    queryFn: ({ signal }) => {
      if (masterId === null) {
        throw new Error('masterId is required.');
      }

      return getMasterChoiceBacktest(
        masterId,
        stockCode,
        masterChoiceRequest,
        signal,
      );
    },
    enabled:
      masterId !== null && Boolean(stockCode) && (options?.enabled ?? true),
  });
};
