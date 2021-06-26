import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {Chart, Options, SeriesLineOptions, SeriesOptions, YAxisOptions} from 'highcharts';

import {ChartEventModel, LineConfigModel, LineValuesModel} from './charts.model';
import {
  HOUR_IN_MILLISECONDS,
  LINE_CHART_CONFIG,
  OPPOSITE_SECONDARY_AXIS_CONFIG,
  SECONDARY_AXIS_CONFIG
} from './line-chart.config';
import {ChartsService} from '../../../../../services/charts.service';

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
    lineChartOptions.yAxis[0].min = this.configs.primaryMin || null;
    lineChartOptions.yAxis[0].max = this.configs.primaryMax || null;
    lineChartOptions.yAxis[0].title.text = this.configs.primaryYaxisTitle || '';
    lineChartOptions.title.text = this.configs.chartTitle || '';
    lineChartOptions.yAxis[0].tickPositioner = this.tickPositioner;
    if (this.configs.primaryPostfix) {
      lineChartOptions.yAxis[0].labels = { format: `{value}${this.configs.primaryPostfix}` };
    }

    if (this.configs.showSecondary) {
      const secondaryAxisOptions = JSON.parse(JSON.stringify(SECONDARY_AXIS_CONFIG));
      secondaryAxisOptions.min = this.configs.secondaryMin || null;
      secondaryAxisOptions.max = this.configs.secondaryMax || null;
      if (this.configs.secondaryPostfix) {
        secondaryAxisOptions.labels = { format: `{value}${this.configs.secondaryPostfix}` };
      }
      (lineChartOptions.yAxis as YAxisOptions[]).push(secondaryAxisOptions);
      lineChartOptions.yAxis[1].title.text = this.configs.secondaryYaxisTitle || '';
    }

    if (this.configs.showOppositeSecondary) {
      const oppositeSecondaryAxisOptions = JSON.parse(JSON.stringify(OPPOSITE_SECONDARY_AXIS_CONFIG));
      oppositeSecondaryAxisOptions.min = this.configs.oppositeSecondaryMin || null;
      oppositeSecondaryAxisOptions.max = this.configs.oppositeSecondaryMax || null;
      if (this.configs.oppositeSecondaryPostfix) {
        oppositeSecondaryAxisOptions.labels = { format: `{value}${this.configs.oppositeSecondaryPostfix}` };
      }
      (lineChartOptions.yAxis as YAxisOptions[]).push(oppositeSecondaryAxisOptions);
      lineChartOptions.yAxis[2].title.text = this.configs.oppositeSecondaryYaxisTitle || '';
      lineChartOptions.yAxis[2].tickPositioner = this.tickPositioner;
    }

    // (lineChartOptions.xAxis as XAxisOptions).tickPositioner = this.xAxisTickPositioner;
    this.chart = this.chartsService.Highcharts.chart(this.lineChartContainer.nativeElement, lineChartOptions);
    this.setSeries(this.mapDataToSeries());
    this.setPlotBands();
  }

  /** Destroys line chart. */
  public ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  public setPlotBands(): void {
    let id = 1;
    this.chart.xAxis[0].tickPositions.forEach( (date, index) => {
      if (index % 2 === 0) {
        this.chart.xAxis[0].addPlotBand({
          from: date,
          to: date + HOUR_IN_MILLISECONDS,
          color: 'rgba(68, 170, 213, 0.1)',
          id: `plot-${id}`
        });
        id += 1;
      }
    });
  }

  /** Sets interval for Y-axis ticks. */
  public tickPositioner(min: number, max: number): number[] {
    const tickPosCor = [];
    const numOfTicks = 5;
    min = 0;
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
