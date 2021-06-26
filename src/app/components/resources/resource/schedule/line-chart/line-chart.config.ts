import { Options } from 'highcharts';

/** `Highcharts` options for the graph of 'line' type. */
export const LINE_CHART_CONFIG: Options = {
  chart: {},
  time: {
    useUTC: false
  },
  data: {},
  title: {
    text: '',
    style: {
      color: '$black',
      fontSize: '18px',
      fontWeight: '700',
    },
    margin: 35,
    align: 'center'
  },
  exporting: {
    enabled: false
  },
  credits: {
    enabled: false
  },
  xAxis: {
    type: 'datetime',
    startOnTick: false,
    tickInterval: 3600 * 1000,
    tickAmount: 6,
    crosshair: true,
    plotBands: [{}]
  },
  yAxis: [
    {
      title: {
        text: '',
        align: 'high',
        style: {
          color: '$black',
          fontSize: '14px',
          fontWeight: '700'
        },
        rotation: 360,
        textAlign: 'left',
        margin: 0,
        y: -20
      },
      labels: {},
      alignTicks: false
    }
  ],
  legend: {
    align: 'center',
    verticalAlign: 'bottom',
    borderWidth: 0,
  },
  tooltip: {
    shared: true,
    outside: true,
    headerFormat: '{point.key}<br>',
    style: {
      fontSize: '14px'
    }
  },
  plotOptions: {
    series: {
      cursor: 'pointer',
      lineWidth: 2,
      states: {
        hover: {
          lineWidth: 3
        }
      },
      marker: {
        enabled: false
      },
      pointInterval: 3600000
    },
    area: {
      fillOpacity: 0.3,
      lineWidth: 4,
    }
  },
  series: []
};

/** `Highcharts` options for opposite secondary axis of graph of 'line' type. */
export const SECONDARY_AXIS_CONFIG = {
  title: {
    text: '',
    align: 'high',
    style: {
      color: '$black',
      fontSize: '14px',
      fontWeight: '700'
    },
    rotation: 360,
    textAlign: 'left',
    margin: 0,
    y: -20
  },
  margin: -80,
  labels: {},
  alignTicks: false
};

/** `Highcharts` options for opposite secondary axis of graph of 'line' type. */
export const OPPOSITE_SECONDARY_AXIS_CONFIG = {
  gridLineWidth: 0,
  title: {
    text: '',
    align: 'high',
    rotation: 0,
    style: {
      color: '$black',
      fontSize: '14px',
      fontWeight: '700'
    },
    textAlign: 'right',
    margin: 0,
    y: -20
  },
  labels: {
    format: '{value}',
  },
  zIndex: 0,
  marker: {
    enabled: false
  },
  opposite: true
};

/** List of default page colors. */
export const COLORS_MAP: MapType<string, string> = {
  VIOLET: '#82a5d7',
  CYAN: '#59c1d1',
  ORANGE: '#f26b37',
  LIGHT_ORANGE: 'rgba(245,105,54,.75)',
  GREEN: '#1fc084',
  LIGHT_GREEN: 'rgba(33, 203, 139, 0.5)',
  BROWN: '#4c4743',
  BLUE: '#00a9e1',
  YELLOW: '#ff9f00',
  LIGHT_BROWN: '#b0854f',
  DARK_GREY: '#525f85',
  RED: '#ff0000',
  GREY: '#d1cfcf'
};
/** The number of milliseconds in one Hour. */
export const HOUR_IN_MILLISECONDS: number = 3600 * 1000;

/** Custom `Map` type. */
export type MapType<TKey extends keyof any, TValue> = {
  [K in TKey]: TValue;
};
