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
import { motion } from 'framer-motion';

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

  const topCompanies = chartData.slice(0, 3);

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
    <div className='w-full p-4'>
      <div className='h-[16rem]'>
        <ChartContainer
          config={{ value: { label: '비중' } }}
          className='h-full w-full'
        >
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart margin={{ top: 16, right: 16, bottom: 16, left: 16 }}>
              <text
                x='50%'
                y='47%'
                textAnchor='middle'
                dominantBaseline='middle'
                fill='var(--secondary2)'
                className='text-label-md font-extrabold'
              >
                TOP 10
              </text>
              <text
                x='50%'
                y='55%'
                textAnchor='middle'
                dominantBaseline='middle'
                fill='var(--secondary2)'
                className='text-label-md font-extrabold'
              >
                보유 기업
              </text>
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
                innerRadius={70}
                outerRadius={114}
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
      <div className='flex flex-col gap-[0.5rem] pt-[1.5rem]'>
        {topCompanies.map((company, index) => (
          <motion.div
            key={company.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.6 + index * 0.15,
              ease: 'easeOut',
            }}
            className='bg-background flex items-center gap-3 rounded-xl px-3 py-2'
          >
            <span className='text-body-lg w-5 shrink-0 font-bold'>
              {index + 1}
            </span>

            <div
              className='h-3 w-3 shrink-0 rounded-full'
              style={{
                backgroundColor: COMPANY_CHART_COLORS[index],
              }}
            />
            <span className='text-body-lg font-bold'>{company.name}</span>

            <span className='text-body-lg font-bold'>{company.value}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
