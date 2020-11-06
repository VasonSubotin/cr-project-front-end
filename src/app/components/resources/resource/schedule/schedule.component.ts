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
    primaryPostfix: '%',
    primaryMax: 100,
    chartTitle: 'First line chart',
    primaryYaxisTitle: 'SOC, %',
    secondaryYaxisTitle: 'Charging Power, kW'
  };
  @Input() battery: any;
  @Input() intervals: any;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
  }

  public ngOnInit(): void {
    const data = this.convertData();

    this.schedulePerformanceValues = [{
      label: 'SOC',
      color: COLORS_MAP.BLUE,
      type: 'line',
      data: this.generateSOC().sort((a, b) => a[0] - b[0]),
      axis: 0
    }, {
      label: 'Power',
      type: 'area',
      color: COLORS_MAP.YELLOW,
      data: this.generatePower(),
      axis: 1
    }];
  }

  public convertData(): number[] {
    const arrayMinutes = [];
    for (let mSecond = this.intervals.moers.start; mSecond < this.intervals.moers.stop; mSecond = mSecond + HOUR_IN_MILLISECONDS) {
      arrayMinutes.push(moment(mSecond).format('LT'));
    }
    return arrayMinutes;
  }

  public generatePower(): number[][] {
    const powerArray = [];
    this.intervals.intervals.map(item => {
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
    this.intervals.intervals[0].energy = this.intervals.intervals[0].energy + (this.intervals.initial_energy);
    this.intervals.intervals.map((item, index, array): any => {
      if (index !== 0) {
        item.energy = item.energy + array[index - 1].energy;
      }
      costSoc.push([+new Date(item.time_start), (item.energy / this.intervals.capacity) * 100]);
    });
    return costSoc;
  }  }

  // generateCost() {
  //   const costArray = [];
  //   CHARGE_SCHEDULE.intervals.map(item => costArray.push(item.price));
  //   console.log('generateCost: ' + costArray);
  //   return costArray;
  // }

  // generateMoers() {
  //   let moers = [];
  //   moers = CHARGE_SCHEDULE.moers.values;
  //   console.log('generateMoers: ' + moers);
  //   return moers;
  // }


