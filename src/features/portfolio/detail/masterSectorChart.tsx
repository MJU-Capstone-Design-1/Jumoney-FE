'use client';

import { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  XAxis,
  XAxisTickContentProps,
  YAxis,
} from 'recharts';
import { useGetMasterPortfolioChart } from '@/api/generated/endpoints/거장-정보/거장-정보';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface PortfolioData {
  sectorChart: { sector: string; weight: number }[];
}

interface ApiResponse {
  data: PortfolioData;
}

interface Props {
  masterId: number;
}

const SECTOR_COLORS: Record<string, string> = {
  금융: 'var(--field-finance)',
  정보기술: 'var(--field-it)',
  필수소비재: 'var(--field-staples)',
  '에너지/화학': 'var(--field-energy)',
  산업재: 'var(--field-mechanic)',
  '커뮤니케이션 서비스': 'var(--field-communication)',
  자유소비재: '#C2185B',
  기타: '#4F545C',
  'ETF/지수': '#D6C7B0',
  헬스케어: 'var(--field-bio)',
};

export function MasterSectorChart({ masterId }: Props) {
  const { data, isLoading } = useGetMasterPortfolioChart(masterId);
  const [activeBarIndex, setActiveBarIndex] = useState<number | null>(null);

  const chartData = useMemo(() => {
    const response = data as unknown as ApiResponse | undefined;
    if (!response?.data) return [];

    return response.data.sectorChart.map((i) => ({
      name: i.sector,
      weight: i.weight,
    }));
  }, [data]);

  if (isLoading)
    return (
      <div className='text-body-lg text-secondary1 flex h-full items-center justify-center font-bold'>
        로딩 중...
      </div>
    );
  if (chartData.length === 0)
    return (
      <div className='text-body-lg text-secondary1 flex h-full items-center justify-center font-bold'>
        데이터가 없습니다.
      </div>
    );

  return (
    <div className='h-[30rem] w-full outline-none'>
      <ChartContainer
        config={{ weight: { label: '비중' } }}
        className='h-full w-full'
      >
        <BarChart
          data={chartData}
          margin={{ top: 16, right: 16, left: 16, bottom: 16 }}
          onClick={(state) => {
            if (state?.activeTooltipIndex == null) {
              setActiveBarIndex(null);
            }
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray='3 3' />
          <YAxis hide />
          <XAxis
            dataKey='name'
            type='category'
            tickLine={false}
            axisLine={false}
            interval={0}
            tick={(props: XAxisTickContentProps) => {
              const { x, y, payload } = props;

              const xPos = typeof x === 'string' ? parseFloat(x) : (x ?? 0);
              const yPos = typeof y === 'string' ? parseFloat(y) : (y ?? 0);

              const text = payload?.value || '';
              const words = text.split(/[\/\s]/);

              return (
                <text
                  x={xPos}
                  y={yPos + 10}
                  textAnchor='middle'
                  className='fill-secondary2 text-body-sm font-semibold'
                >
                  {words.map((word: string, index: number) => (
                    <tspan
                      key={`${word}-${index}`}
                      x={xPos}
                      dy={index === 0 ? 0 : 12}
                    >
                      {word}
                    </tspan>
                  ))}
                </text>
              );
            }}
          />
          <ChartTooltip
            trigger='click'
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
                      color: SECTOR_COLORS[item.payload.name],
                      value: `${item.value}%`,
                      name: '비중',
                    },
                  ]}
                  indicator='dashed'
                  className='bg-secondary1 items-start text-left opacity-100'
                />
              );
            }}
            cursor={false}
          />
          <Bar
            dataKey='weight'
            radius={4}
            barSize={36}
            activeBar={false}
            onClick={(_, index) => {
              setActiveBarIndex((prev) => (prev === index ? null : index));
            }}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                className='focus:outline-none'
                style={{ outline: 'none' }}
                fill={SECTOR_COLORS[entry.name] ?? 'hsl(var(--chart-1))'}
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}
