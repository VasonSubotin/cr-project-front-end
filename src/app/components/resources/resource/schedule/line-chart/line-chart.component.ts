import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  EventEmitter,
  OnDestroy, Output,
  ViewChild
} from '@angular/core';
import {
  Chart,
  Options,
  SeriesLineOptions,
  SeriesOptions,
  XAxisOptions,
  YAxisOptions
} from 'highcharts';

import { ChartEventModel, LineConfigModel, LineValuesModel, Ticks } from './charts.model';
import { HOUR_IN_MILLISECONDS, LINE_CHART_CONFIG, SECONDARY_AXIS_CONFIG } from './line-chart.config';
import { ChartsService } from '../../../../../services/charts.service';
import { CHARGE_SCHEDULE } from '../line-chart-data';
import * as moment from "moment";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html'
})
export class LineChartComponent implements AfterViewInit, OnDestroy {
  /** Line chart data. */
  @Input() public values: LineValuesModel[];
  /** Line chart configuration. */
  @Input() public configs: LineConfigModel;
  /** Event of line chart point click. */
  @Output() private ChartEvent: EventEmitter<ChartEventModel> = new EventEmitter();
  /** `Chart` instance. */
  private chart: Chart;
  /** `ElementRef` instance of line chart container. */
  @ViewChild('lineChart') private lineChartContainer: ElementRef;

  constructor(private chartsService: ChartsService) {
  }

  /** Sets line chart options. Creates `Chart` instance. */
  ngAfterViewInit() {
    const lineChartOptions: Options = JSON.parse(JSON.stringify(LINE_CHART_CONFIG));
    if (this.configs.showSecondary) {
      const secondaryAxisOptions = JSON.parse(JSON.stringify(SECONDARY_AXIS_CONFIG));
      secondaryAxisOptions.min = this.configs.secondaryMin || null;
      secondaryAxisOptions.max = this.configs.secondaryMax || null;
      if (this.configs.secondaryPostfix) {
        secondaryAxisOptions.labels = { format: `{value}${this.configs.secondaryPostfix}` };
      }
      (lineChartOptions.yAxis as YAxisOptions[]).push(secondaryAxisOptions);
      lineChartOptions.yAxis[1].title.text = this.configs.secondaryYaxisTitle || '';
      lineChartOptions.yAxis[1].tickPositioner = this.tickPositioner;
    }
    lineChartOptions.yAxis[0].min = this.configs.primaryMin || null;
    lineChartOptions.yAxis[0].max = this.configs.primaryMax || null;
    lineChartOptions.yAxis[0].title.text = this.configs.primaryYaxisTitle || '';
    lineChartOptions.title.text = this.configs.chartTitle || '';
    if (this.configs.primaryPostfix) {
      lineChartOptions.yAxis[0].labels = { format: `{value}${this.configs.primaryPostfix}` };
    }
    if ('plotBands' in lineChartOptions.xAxis) {
      lineChartOptions.xAxis.plotBands.forEach(item => {
        const eightPart = (this.values[0].data[this.values[0].data.length - 1][0] - this.values[0].data[0][0]) / 8;
        const part = (this.values[0].data[this.values[0].data.length - 1][0] - this.values[0].data[0][0]) / 2;
        if (item.id === 'first') {
          item.from = this.values[0].data[0][0];
          item.to = this.values[0].data[0][0] + eightPart;
        }
        if (item.id === 'second') {
          item.from = this.values[0].data[0][0] + eightPart * 2;
          item.to = this.values[0].data[0][0] + (eightPart * 2) + eightPart;
        }
        if (item.id === 'third') {
          item.from = this.values[0].data[0][0] + part;
          item.to = this.values[0].data[0][0] + part + eightPart;
        }
        if (item.id === 'last') {
          item.from = this.values[0].data[this.values[0].data.length - 1][0] - eightPart * 2;
          item.to = this.values[0].data[this.values[0].data.length - 1][0] - eightPart;
        }
      });
    }
    // (lineChartOptions.xAxis as XAxisOptions).tickPositioner = this.xAxisTickPositioner;
    this.chart = this.chartsService.Highcharts.chart(this.lineChartContainer.nativeElement, lineChartOptions);
    this.setSeries(this.mapDataToSeries());
  }

  /** Destroys line chart. */
  public ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  /** Sets interval for Y-axis ticks. */
  public tickPositioner(min: number, max: number): number[] {
    const tickPosCor = [];
    const numOfTicks = 5;
    let maxDataYaxis = 0;
    CHARGE_SCHEDULE.intervals.forEach( item => {
      if (item.power > maxDataYaxis) {
        maxDataYaxis = item.power;
      }
    });
    if (max !== maxDataYaxis) {
      max = maxDataYaxis;
    }
    const tik = (max - min) / numOfTicks;
    let k = 0;
    if (tik <= 0) {
      return [Math.min(min, max), Math.max(min, max)];
    }
    while (Math.pow(10, k) > tik ) {
      k--;
    }
    tickPosCor.push(Math.round(min * Math.pow(10, -k)) / Math.pow(10, -k));
    for (let i = 0; i < numOfTicks; i++) {
      tickPosCor.push(Math.round((tickPosCor[i] + tik) * Math.pow(10, -k)) / Math.pow(10, -k));
      if ((i === 4) && (tickPosCor[5] !== max)) {
        tickPosCor[5] = Math.round(max);
      }
    }
    return tickPosCor;
  }

  /** Sets interval for X-axis ticks. */
  public xAxisTickPositioner(): number[] {
    const minTick = CHARGE_SCHEDULE.moers.start;
    const maxTick = CHARGE_SCHEDULE.moers.stop;

    const length = Math.round((maxTick - minTick) / (HOUR_IN_MILLISECONDS)) - 2;
    const ticks: any = [];
    for (let i = 0; i < length; i++) {
      if (i === 0) {
        ticks.push(+(new Date(minTick)).getHours());
      } else if (i === length - 1) {
        ticks.push(+(new Date(maxTick)).getHours());
      } else {
        ticks.push(+(new Date(ticks[i - 1] + 2)));
      }
    }
    ticks.unshift(+(new Date(minTick - HOUR_IN_MILLISECONDS)).getHours());
    ticks.push(+(new Date(maxTick + HOUR_IN_MILLISECONDS)).getHours());
    ticks.info = {
      higherRanks: {},
      unitName: 'hour'
    };
    return ticks;
  }

  /** Round min and max position. */
  public getRoundPosition(position: number): number {
    const newDate = new Date(position);
    let tick: number;
    if (newDate.getMinutes() > 30) {
      tick = position + (newDate.getMinutes() * 60000);
    } else if (newDate.getMinutes() < 30) {
      tick = position - (newDate.getMinutes() * 60000);
    } else {
      tick = position;
    }
    return tick;
  }

  /** Maps data to Array of line chart series. */
  private mapDataToSeries(): SeriesOptions[] {
    const self = this;
    return this.values.map(item => ({
      type: item.type,
      data: item.data,
      color: item.color,
      name: item.label,
      yAxis: item.axis,
      point: {
        events: {
          click(): void {
            self.ChartEvent.emit({
              x: +this.category,
              y: this.y,
              name: this.series.name
            });
          }
        }
      }
    }));
  }

  /** Sets series to the line chart. */
  private setSeries(series: SeriesOptions[]): void {
    while ((this.chart.series).length) {
      this.chart.series[0].remove(false);
    }
    series.forEach((ser: SeriesLineOptions): void => {
      this.chart.addSeries(ser, false);
    });
    this.chart.update({}, true);
  }

}
