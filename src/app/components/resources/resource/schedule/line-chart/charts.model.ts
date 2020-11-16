import { AxisTickPositionerCallbackFunction } from 'highcharts';

/** Chart event interface. */
export interface ChartEventModel {
  /** X-axis value. */
  x: number | string;
  /** Y-axis value. */
  y: number | string;
  /** Parameter name. */
  name?: string;
}

/** Line chart configuration interface. */
export interface LineConfigModel {
  /** Primary Y-axis minimum value. */
  primaryMin?: number;
  /** Primary Y-axis maximum value. */
  primaryMax?: number;
  /** Variable that is responsible for showing secondary Y-axis. */
  showSecondary?: boolean;
  /** Secondary Y-axis minimum value. */
  secondaryMin?: number;
  /** Secondary Y-axis maximum value. */
  secondaryMax?: number;
  /** Variable that is responsible for showing opposite secondary Y-axis. */
  showOppositeSecondary?: boolean;
  /** Opposite secondary Y-axis minimum value. */
  oppositeSecondaryMin?: number;
  /** Opposite secondary Y-axis maximum value. */
  oppositeSecondaryMax?: number;
  /** Primary Y-axis postfix. */
  primaryPostfix?: string;
  /** Secondary Y-axis postfix. */
  secondaryPostfix?: string;
  /** Opposite secondary Y-axis postfix. */
  oppositeSecondaryPostfix?: string;
  /** Line chart title. */
  chartTitle?: string;
  /** Primary Yaxis chart title. */
  primaryYaxisTitle?: string;
  /** Secondary Yaxis chart title. */
  secondaryYaxisTitle?: string;
  /** Opposite secondary Yaxis chart title. */
  oppositeSecondaryYaxisTitle?: string;
  /** Tick positioner function. */
  tickPositioner?: AxisTickPositionerCallbackFunction;
}

/** Line chart data interface. */
export interface LineValuesModel {
  /** Line chart label. */
  label: string;
  /** List of line chart points. */
  data: [number, number][] | number[][];
  /** Line chart color. */
  color?: string;
  /** The type of chart. */
  type?: string;
  /** Line chart Y-axis index. */
  axis?: number;
}

/** Highcharts Ticks interface. */
export interface Ticks extends Array<number> {
  /** Ticks settings. */
  info: {
    /** Higher ranks values. */
    higherRanks: object;
    /** Unit name. */
    unitName: string;
  };
}
