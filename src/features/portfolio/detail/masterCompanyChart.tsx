'use client';

import { useMemo, useState } from 'react';
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  PieSectorDataItem,
} from 'recharts';
import { useGetMasterPortfolioChart } from '@/api/generated/endpoints/거장-정보/거장-정보';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface CompanyItem {
  stockName: string;
  weight: number;
}

interface MasterPortfolioResponse {
  companyRatioChart: CompanyItem[];
}

interface AxiosResponseWrapper {
  data: MasterPortfolioResponse;
}

interface Props {
  masterId: number;
}

interface ChartItem {
  name: string;
  value: number;
}

const COMPANY_COLORS: Record<string, string> = {
  애플: 'var(--field-it)',
  '아메리칸 익스프레스': 'var(--field-finance)',
  뱅크오브아메리카: 'var(--field-finance)',
  코카콜라: 'var(--field-staples)',
  쉐브론: 'var(--field-energy)',
  무디스: 'var(--field-finance)',
  '옥시덴탈 페트롤리움': 'var(--field-energy)',
  처브: 'var(--field-finance)',
  '크래프트 하인즈': 'var(--field-staples)',
  알파벳: 'var(--field-communication)',
};

const renderActiveShape = (props: PieSectorDataItem) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
    props;

  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={(outerRadius ?? 0) + 10}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  );
};

export function MasterCompanyChart({ masterId }: Props) {
  const { data, isLoading } = useGetMasterPortfolioChart(masterId);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const chartData: ChartItem[] = useMemo(() => {
    const responseWrapper = data as unknown as AxiosResponseWrapper | undefined;
    const list = responseWrapper?.data?.companyRatioChart;

    if (!list || !Array.isArray(list)) return [];

    return [...list]
      .sort((a, b) => b.weight - a.weight)
      .map((item) => ({
        name: item.stockName,
        value: item.weight,
      }));
  }, [data]);

  if (isLoading)
    return (
      <div className='flex h-[30rem] items-center justify-center'>
        로딩 중...
      </div>
    );

  if (chartData.length === 0)
    return (
      <div className='flex h-[30rem] items-center justify-center'>
        데이터가 없습니다.
      </div>
    );

  return (
    <div className='h-[25rem] w-full p-4'>
      <ChartContainer
        config={{ value: { label: '비중' } }}
        className='h-full w-full'
      >
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart margin={{ top: 16, right: 16, bottom: 16, left: 16 }}>
            <ChartTooltip
              trigger='click'
              active={activeIndex !== undefined}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;

                const item = payload[0];

                return (
                  <ChartTooltipContent
                    active={active}
                    label={item.payload.name}
                    payload={[
                      {
                        ...item,
                        name: '비중',
                        value: `${item.value}%`,
                      },
                    ]}
                    indicator='dashed'
                    className='bg-secondary1 items-start text-left opacity-100'
                  />
                );
              }}
            />

            <Pie
              data={chartData}
              dataKey='value'
              innerRadius={74}
              outerRadius={120}
              {...(activeIndex !== undefined
                ? {
                    activeIndex,
                    activeShape: renderActiveShape,
                  }
                : {})}
              onClick={(_, index) =>
                setActiveIndex(index === activeIndex ? undefined : index)
              }
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COMPANY_COLORS[entry.name] ?? 'hsl(var(--chart-1))'}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
