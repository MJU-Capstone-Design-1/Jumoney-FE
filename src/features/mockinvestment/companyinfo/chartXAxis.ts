import {
  IChartApi,
  LogicalRange,
  TickMarkType,
  Time,
} from 'lightweight-charts';

import { PeriodValue } from './periodToggle';

export interface ChartPoint {
  time: Time;
}

export interface XAxisLabel {
  key: string;
  label: string;
  time: Time;
}

export interface PositionedXAxisLabel extends XAxisLabel {
  align: 'left' | 'center' | 'right';
  left: number;
}

const X_AXIS_LABEL_EDGE_PADDING = 24;

const clampXAxisLabelLeft = (left: number, chartWidth: number) => {
  const maxLeft = Math.max(
    X_AXIS_LABEL_EDGE_PADDING,
    chartWidth - X_AXIS_LABEL_EDGE_PADDING,
  );

  return Math.min(Math.max(left, X_AXIS_LABEL_EDGE_PADDING), maxLeft);
};

const getXAxisLabelAlign = (left: number, chartWidth: number) => {
  if (left <= X_AXIS_LABEL_EDGE_PADDING) return 'left';
  if (left >= chartWidth - X_AXIS_LABEL_EDGE_PADDING) return 'right';

  return 'center';
};

const getDateFromTime = (time: Time) => {
  if (typeof time === 'number') {
    return new Date(time * 1000);
  }

  if (typeof time === 'string') {
    return new Date(time);
  }

  return new Date(Date.UTC(time.year, time.month - 1, time.day));
};

const formatDay = (date: Date) => {
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');

  return `${mm}.${dd}`;
};

export const formatChartTickMark = (
  time: Time,
  tickMarkType: TickMarkType,
  period: PeriodValue | undefined,
) => {
  const date = getDateFromTime(time);
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  if (period === '1w') {
    return formatDay(date);
  }

  if (period === '1y') {
    return `${month}월`;
  }

  if (period === '5y') {
    return String(year);
  }

  if (tickMarkType === TickMarkType.Time) {
    const hh = String(date.getUTCHours()).padStart(2, '0');
    const min = String(date.getUTCMinutes()).padStart(2, '0');

    return `${hh}:${min}`;
  }

  return formatDay(date);
};

export const getXAxisLabels = (
  data: ChartPoint[],
  period: PeriodValue | undefined,
) => {
  const labels: XAxisLabel[] = [];
  const seen = new Set<string>();

  data.forEach(({ time }) => {
    const date = getDateFromTime(time);
    let key: string;
    let label: string;

    if (period === '1w') {
      key = [date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()].join(
        '-',
      );
      label = formatDay(date);
    } else if (period === '1y') {
      key = [date.getUTCFullYear(), date.getUTCMonth()].join('-');
      label = `${date.getUTCMonth() + 1}월`;
    } else if (period === '5y') {
      key = String(date.getUTCFullYear());
      label = key;
    } else {
      return;
    }

    if (seen.has(key)) return;

    seen.add(key);
    labels.push({ key, label, time });
  });

  return labels;
};

export const positionXAxisLabels = (
  chart: IChartApi | null,
  labels: XAxisLabel[],
): PositionedXAxisLabel[] => {
  if (!chart) return [];

  const chartWidth = chart.timeScale().width();

  return labels
    .map((label) => {
      const left = chart.timeScale().timeToCoordinate(label.time);

      if (left == null) return null;

      return {
        ...label,
        align: getXAxisLabelAlign(Number(left), chartWidth),
        left: clampXAxisLabelLeft(Number(left), chartWidth),
      };
    })
    .filter((label): label is PositionedXAxisLabel => label != null);
};

export interface TimeAxisDragState {
  pointerId: number;
  startX: number;
  startRange: LogicalRange;
}

export const moveTimeScaleByDrag = (
  chart: IChartApi | null,
  chartWidth: number,
  startRange: LogicalRange,
  deltaX: number,
) => {
  if (!chart || chartWidth <= 0) return;

  const logicalWidth = startRange.to - startRange.from;
  const deltaLogical = (deltaX / chartWidth) * logicalWidth;

  chart.timeScale().setVisibleLogicalRange({
    from: startRange.from - deltaLogical,
    to: startRange.to - deltaLogical,
  });
};
