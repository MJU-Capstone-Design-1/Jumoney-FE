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

export const COMPANY_CHART_COLORS = [
  '#7FA8FF',
  '#9A8FFF',
  '#BE8FFF',
  '#FF97C7',
  '#FF9F8A',
  '#FFBE73',
  '#FFD76B',
  '#A8D96C',
  '#73D0A7',
  '#7CC4F0',
];

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
                    labelClassName='font-semibold text-body-md'
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
                  fill={
                    COMPANY_CHART_COLORS[index % COMPANY_CHART_COLORS.length]
                  }
                  stroke={COMPANY_CHART_COLORS[index]}
                  strokeWidth={1}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
