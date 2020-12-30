import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';

import {AuthService} from '../../../../services/auth.service';
import {LineConfigModel, LineValuesModel} from './line-chart/charts.model';
import {COLORS_MAP, HOUR_IN_MILLISECONDS} from './line-chart/line-chart.config';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html'
})

export class ScheduleComponent implements OnInit {
  /** Schedule Performance line chart data. */
  public schedulePerformanceValues: LineValuesModel[] = [];
  /** Schedule Performance line chart configuration. */
  public schedulePerformanceConfigs: LineConfigModel = {
    showSecondary: true,
    showOppositeSecondary: true,
    secondaryPostfix: '%',
    secondaryMax: 100,
    oppositeSecondaryMax: 10000,
    chartTitle: 'First line chart',
    primaryYaxisTitle: 'CO2, kg/kWh',
    secondaryYaxisTitle: 'SOC, %',
    oppositeSecondaryYaxisTitle: 'Charging Power, kW'
  };
  @Input() battery: any;
  @Input() intervals: any;
  @Input() initial_energy: number;
  @Input() capacity: number;
  @Input() moers: any;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
  }

  public ngOnInit(): void {
    const data = this.convertData();

    this.schedulePerformanceValues = [{
      label: 'CO2 emission',
      color: COLORS_MAP.ORANGE,
      type: 'line',
      data: this.generateMoers().sort((a, b) => a[0] - b[0]),
      axis: 0
    }, {
      label: 'SOC',
      color: COLORS_MAP.BLUE,
      type: 'line',
      data: this.generateSOC().sort((a, b) => a[0] - b[0]),
      axis: 1
    }, {
      label: 'Power',
      type: 'area',
      color: COLORS_MAP.YELLOW,
      data: this.generatePower(),
      axis: 2
    }];
  }

  public convertData(): number[] {
    const arrayMinutes = [];
    for (let mSecond = this.moers.start; mSecond < this.moers.stop; mSecond = mSecond + HOUR_IN_MILLISECONDS) {
      arrayMinutes.push(moment(mSecond).format('LT'));
    }
    return arrayMinutes;
  }

  public generatePower(): number[][] {
    const powerArray = [];
    this.intervals.map(item => {
      powerArray.push([+new Date(item.time_start), null]);
      powerArray.push([+new Date(item.time_start), 0]);
      powerArray.push([+new Date(item.time_start), item.power]);
      powerArray.push([+new Date(item.time_start) + item.duration, item.power]);
      powerArray.push([+new Date(item.time_start) + item.duration, 0]);
      powerArray.push([+new Date(item.time_start) + item.duration, null]);
    });
    return powerArray;
  }

  public generateSOC(): number[][] {
    const costSoc = [];
    this.intervals[0].energy = this.intervals[0].energy + (this.initial_energy);
    this.intervals.map((item, index, array): any => {
      if (index !== 0) {
        item.energy = item.energy + array[index - 1].energy;
      }
      costSoc.push([+new Date(item.time_start), (item.energy / this.capacity) * 100]);
    });
    return costSoc;
  }

  public generateMoers(): number[][] {
    let moers = [];
    let date = this.moers.start;
    if(this.moers.values) {
      this.moers.values.forEach(value => {
        moers.push([date, value / 1000]);
        date = date + (1000 * 60 * 5);
      });
    }
    return moers;
  }
}

// generateCost() {
//   const costArray = [];
//   CHARGE_SCHEDULE.intervals.map(item => costArray.push(item.price));
//   console.log('generateCost: ' + costArray);
//   return costArray;
// }



