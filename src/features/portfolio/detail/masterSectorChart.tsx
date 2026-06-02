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
import { motion } from 'framer-motion';

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

const MASTER_SECTOR_DESCRIPTIONS: Record<number, string[]> = {
  1: [
    '금융과 소비재 비중이 높은 방어적인 포트폴리오예요.',
    '일부 핵심 산업에 집중 투자하는 전략을 보여요.',
    '소수의 확신 있는 섹터에 자산을 집중하는 경향이 있어요.',
    '비교적 안정적인 산업군 중심으로 구성되어 있어요.',
  ],
  2: [
    '소비재 중심의 다양한 종목에 분산 투자하는 전략을 보여요.',
    '성장 가능성이 높은 기업을 발굴하는 투자 성향이에요.',
    '개별 기업의 성장성에 집중하는 포트폴리오에요.',
    '여러 산업에 걸쳐 기회를 찾는 투자 전략이 반영되어 있어요.',
  ],
  3: [
    'ETF 중심의 자산 배분 전략이 반영된 포트폴리오예요.',
    '다양한 자산에 분산 투자해 위험을 관리하는 전략이에요.',
    '특정 산업보다 시장 전반에 투자하는 비중이 높아요.',
    '안정적인 수익과 리스크 관리를 함께 고려한 구성이에요.',
  ],
  4: [
    '정보기술·소비 중심 성장주 비중이 높은 포트폴리오예요.',
    '성장 가능성이 높은 산업에 집중 투자하는 전략을 보여요.',
    '시장을 주도하는 기업 중심의 투자 성향이 나타나요.',
    '혁신 산업과 성장 섹터에 대한 높은 관심이 반영되어 있어요.',
  ],
};

export function MasterSectorChart({ masterId }: Props) {
  const { data, isLoading } = useGetMasterPortfolioChart(masterId);
  const [activeBarIndex, setActiveBarIndex] = useState<number | null>(null);
  const descriptions = MASTER_SECTOR_DESCRIPTIONS[masterId] ?? [];

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
    <div className='w-full'>
      <div className='h-[16rem] w-full outline-none'>
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
                    labelClassName='font-semibold text-body-md'
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
      <div className='flex flex-col gap-[0.5rem]'>
        {descriptions.map((description, index) => (
          <motion.div
            key={description}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.3 + index * 0.1,
            }}
            className='bg-background rounded-xl px-4 py-3'
          >
            <p className='text-body-md font-semibold'>{description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
