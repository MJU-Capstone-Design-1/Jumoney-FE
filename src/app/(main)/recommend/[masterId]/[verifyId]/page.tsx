import VerifyBacktestClient from './verifyBacktestClient';

interface VerifyPageProps {
  params: Promise<{
    masterId: string;
    verifyId: string;
  }>;
  searchParams: Promise<{
    stockName?: string | string[];
    optionIds?: string | string[];
    sectors?: string | string[];
  }>;
}

const getFirstSearchParam = (value?: string | string[]) => {
  if (Array.isArray(value)) return value[0];
  return value;
};

export default async function VerifyPage({
  params,
  searchParams,
}: VerifyPageProps) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);

  return (
    <VerifyBacktestClient
      masterId={resolvedParams.masterId}
      stockCode={resolvedParams.verifyId}
      stockName={getFirstSearchParam(resolvedSearchParams.stockName)}
      optionIds={getFirstSearchParam(resolvedSearchParams.optionIds)}
      sectors={getFirstSearchParam(resolvedSearchParams.sectors)}
    />
  );
}
