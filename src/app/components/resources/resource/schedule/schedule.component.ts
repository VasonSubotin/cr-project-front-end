import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { AuthService } from '../../../../services/auth.service';
import { LineConfigModel, LineValuesModel } from './line-chart/charts.model';
import {
  COLORS_MAP,
} from './line-chart/line-chart.config';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
})
export class ScheduleComponent implements OnInit {
  /** Schedule Performance line chart data. */
  public schedulePerformanceValues: LineValuesModel[] = [];
  /** Schedule Performance line chart configuration. */
  public schedulePerformanceConfigs: LineConfigModel = {
    showSecondary: true,
    showOppositeSecondary: true,
    secondaryPostfix: '%',
    primaryMax: 2,
    secondaryMax: 100,
    oppositeSecondaryMax: 10000,
    chartTitle: '',
    primaryYaxisTitle: 'CO2, kg/kWh',
    secondaryYaxisTitle: 'SOC, %',
    oppositeSecondaryYaxisTitle: 'Charging Power, kW',
  };
  @Input() battery: any;
  @Input() intervals: any;
  @Input() initial_energy: number;
  @Input() capacity: number;
  @Input() moers: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {

    this.schedulePerformanceValues = [
      {
        label: 'CO2 emission',
        color: COLORS_MAP.ORANGE,
        type: 'line',
        data: this.generateMoers().sort((a, b) => a[0] - b[0]),
        axis: 0,
      },
      {
        label: 'SOC',
        color: COLORS_MAP.BLUE,
        type: 'line',
        data: this.generateSOC().sort((a, b) => a[0] - b[0]),
        axis: 1,
      },
      {
        label: 'Power',
        type: 'area',
        color: COLORS_MAP.YELLOW,
        data: this.generatePower(),
        axis: 2,
      },
    ];
  }

  public generatePower(): number[][] {
    const powerArray = [];
    this.intervals.map((item) => {
      powerArray.push([+new Date(item.time_start), 0]);
      powerArray.push([+new Date(item.time_start), item.power]);
      powerArray.push([+new Date(item.time_start) + item.duration, item.power]);
      powerArray.push([+new Date(item.time_start) + item.duration, 0]);
    });
    console.log('powerArray', powerArray)
    return powerArray;
  }

  public generateSOC(): number[][] {
    const costSoc = [];
    this.intervals.map((item, index, array): any => {
      let startInterval = 0;
      if (index === 0) {
        startInterval += this.initial_energy;
      }
      if (index !== 0) {
        startInterval = array[index - 1].energy;
      }
      costSoc.push([
        +new Date(item.time_start),
        (startInterval / this.capacity) * 100,
      ]);
      item.energy += startInterval;
      costSoc.push([
        +new Date(item.time_start) + item.duration,
        (item.energy / this.capacity) * 100,
      ]);
    });
    console.log('costSoc', costSoc)
    return costSoc;
  }

  public generateMoers(): number[][] {
    let moers = [];
    if (this.moers) {
      let date = this.moers.start;
      let iStart: number = 0, iEnd: number = 0;
      if (this.intervals && this.intervals.length > 0) {
        iStart = new Date(this.intervals[0].time_start).getTime();

        if (iStart > this.moers.start) {
          date = iStart;
        }

        iEnd = new Date(this.intervals[this.intervals.length - 1].time_start).getTime()  + this.intervals[this.intervals.length - 1].duration 
        
      }

      if (this.moers.values) {
    
        this.moers.values.forEach((value) => {
          if(iEnd >= date ){
          moers.push([date, value / 1000]);
          date = date + 1000 * 60 * 5;
          }
        });

        const lastValue = this.moers.values[this.intervals.length - 1]
        while (iEnd >= date) {
          moers.push([date, lastValue  / 1000]);
          date = date + 1000 * 60 * 5;
        }
       
      }
    }    console.log('moers', moers)

    return moers;
  }
}

// generateCost() {
//   const costArray = [];
//   CHARGE_SCHEDULE.intervals.map(item => costArray.push(item.price));
//   console.log('generateCost: ' + costArray);
//   return costArray;
// }
