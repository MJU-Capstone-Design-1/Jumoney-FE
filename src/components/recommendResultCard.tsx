'use client';

import VerificationButton from './verificationButton';
import { useParams, useRouter } from 'next/navigation';
import type {
  MasterChoiceRequest,
  RecommendedStockResponse,
} from '@/api/generated/model';
import { LOGIC_CODE_TO_KOREAN } from '@/constants/masters';
import { masterSortMetricLabels } from '@/constants/masterLabels';
import { labelMappings } from '@/constants/labelMappings';
import Image from 'next/image';

interface RecommendResultCardProps {
  data: Omit<RecommendedStockResponse, 'tags'> & {
    tags?: string[];
    stockCode?: string;
  };
  selectedOptionIds?: number[];
  selectedSectorTypes?: MasterChoiceRequest['sectorTypes'];
}

const RecommendResultCard = ({
  data,
  selectedOptionIds,
  selectedSectorTypes,
}: RecommendResultCardProps) => {
  const params = useParams();
  const router = useRouter();

  const masterId = params?.masterId as string | undefined;
  const isMasterIdPage = Boolean(masterId);

  const handleVerifyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (masterId && data.stockCode) {
      const query = new URLSearchParams();

      if (data.stockName) {
        query.set('stockName', data.stockName);
      }

      if (selectedOptionIds?.length) {
        query.set('optionIds', selectedOptionIds.join(','));
      }

      if (selectedSectorTypes?.length) {
        query.set('sectors', selectedSectorTypes.join(','));
      }

      const queryString = query.toString();
      router.push(
        `/recommend/${masterId}/${encodeURIComponent(data.stockCode)}${
          queryString ? `?${queryString}` : ''
        }`,
      );
    }
  };

  const formatPrice = (price?: number) => {
    if (price === undefined) return '0';
    return price.toLocaleString();
  };

  const getMetricLabel = (key: string) => {
    const upperKey = key.toUpperCase();
    return (
      masterSortMetricLabels[upperKey as keyof typeof masterSortMetricLabels] ||
      LOGIC_CODE_TO_KOREAN[upperKey] ||
      labelMappings[upperKey as keyof typeof labelMappings] ||
      key
    );
  };

  const formatMetricValue = (key: string, value: number) => {
    const upperKey = key.toUpperCase();
    const label = getMetricLabel(key);

    if (
      label.includes('대금') ||
      label.includes('총액') ||
      label.includes('매수') ||
      upperKey.includes('AMOUNT') ||
      upperKey.includes('CAP') ||
      upperKey.includes('VALUE') ||
      upperKey.includes('PRICE') ||
      upperKey.includes('BUY')
    ) {
      return `₩${value.toLocaleString()}`;
    }

    if (
      label.includes('PER') ||
      label.includes('PBR') ||
      label.includes('PEG') ||
      upperKey.includes('PER') ||
      upperKey.includes('PBR') ||
      upperKey.includes('PEG')
    ) {
      return `${value}배`;
    }

    return `${value}%`;
  };

  const stockTags = data.tags || [];
  const goodSectorTags = data.goodSectorTags || [];
  const hasDisplayTags = stockTags.length > 0 || goodSectorTags.length > 0;

  const getGoodSectorTagLabel = (key: string) => {
    return labelMappings[key as keyof typeof labelMappings] || key;
  };

  return (
    <div
      role='button'
      className='bg-secondary1 shadow-card-shadow flex w-full cursor-pointer flex-col gap-[1rem] rounded-[2rem] px-[1.5rem] py-[1rem] text-left'
    >
      <div className='flex w-full items-center justify-between gap-[1rem]'>
        <div className='flex min-w-0 items-center gap-[0.5rem]'>
          {data.stockCode ? (
            <Image
              src={`/logos/${data.stockCode}.png`}
              alt={`${data.stockName || '종목'} 로고`}
              width={48}
              height={48}
              className='bg-secondary1 h-[3rem] w-[3rem] flex-shrink-0 rounded-full object-contain'
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget
                  .nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'block';
              }}
            />
          ) : null}

          <div
            className='bg-primary h-[3rem] w-[3rem] flex-shrink-0 rounded-full'
            style={{ display: data.stockCode ? 'none' : 'block' }}
          />

          <div className='flex min-w-0 flex-col gap-[0.25rem]'>
            <div className='text-body-xl truncate font-extrabold'>
              {data.stockName || '추천 종목'}
            </div>

            <div className='text-body-sm flex flex-wrap gap-x-[0.5rem] font-bold'>
              {hasDisplayTags ? (
                <>
                  {stockTags.map((code, index) => {
                    const displayTag =
                      masterSortMetricLabels[code.toUpperCase()] ||
                      LOGIC_CODE_TO_KOREAN[
                        code as keyof typeof LOGIC_CODE_TO_KOREAN
                      ] ||
                      code;
                    return (
                      <div
                        key={`tag-${index}`}
                        className='text-text-sub whitespace-nowrap'
                      >
                        # {displayTag}
                      </div>
                    );
                  })}

                  {goodSectorTags.map((code, index) => (
                    <div
                      key={`good-sector-${index}`}
                      className='text-primary whitespace-nowrap'
                    >
                      # {getGoodSectorTagLabel(code)}
                    </div>
                  ))}
                </>
              ) : (
                <div className='text-text-sub'>#종목 태그</div>
              )}
            </div>
          </div>
        </div>
        {isMasterIdPage && (
          <div className='flex-shrink-0'>
            <VerificationButton onClick={handleVerifyClick} />
          </div>
        )}
      </div>

      <div className='flex items-center gap-[0.5rem]'>
        <div className='text-body-md flex items-center gap-[0.25rem] font-extrabold'>
          <span>₩{formatPrice(data.currentPrice)}</span>
          {data.changeRate !== undefined && (
            <span
              className={
                data.changeRate > 0
                  ? 'text-text-up'
                  : data.changeRate < 0
                    ? 'text-text-down'
                    : ''
              }
            >
              ({data.changeRate > 0 ? '+' : ''}
              {data.changeRate.toFixed(1)}%{' '}
              {data.changeRate > 0 ? '▲' : data.changeRate < 0 ? '▼' : ''})
            </span>
          )}
        </div>

        {data.sortMetricKey && data.sortMetricValue !== undefined && (
          <>
            <div className='bg-secondary2 flex h-[0.75rem] w-[0.0625rem]' />
            <p className='text-body-md font-semibold'>
              {getMetricLabel(data.sortMetricKey)}{' '}
              {formatMetricValue(data.sortMetricKey, data.sortMetricValue)}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default RecommendResultCard;
