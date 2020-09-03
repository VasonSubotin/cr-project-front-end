import {Component, OnInit, ViewChild} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {ChartDataSets, ChartOptions} from 'chart.js';
import {BaseChartDirective, Color, Label} from 'ng2-charts';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html'
})


export class ScheduleComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
  }
  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;

  intervals = [
    {
      "start_time": "2014-05-01T05:00:00",
      "location": "Location A",
      "cost_of_charging": 11.5,
      "price": 3.4,
      "duration": 60,
      "energy": 9.3,
      "power": 6.6,
      "interval_type": "CHR",
      "co2_impact": 0,
      "soc_achieved": 58
    },
    {
      "time_start": "2014-05-01T05:01:00",
      "location": 'NA',
      "cost_of_charging": 0,
      "price": 3.4,
      "duration": 3600,
      "energy": 0,
      "power": 0,
      "interval_type": "NCRH",
      "economic_savings": 0,
      "co2_impact": 0,
      "soc_achieved": 48
    },
    {
      "time_start": "2014-05-01T05:01:00",
      "location": 'NA',
      "cost_of_charging": 0,
      "price": 3.4,
      "duration": 3600,
      "energy": 0,
      "power": 0,
      "interval_type": "NCRH",
      "economic_savings": 0,
      "co2_impact": 0,
      "soc_achieved": 48
    },
    {
      "time_start": "2014-05-01T05:01:00",
      "location": 'NA',
      "cost_of_charging": 0,
      "price": 3.4,
      "duration": 3600,
      "energy": 0,
      "power": 0,
      "interval_type": "NCRH",
      "economic_savings": 0,
      "co2_impact": 0,
      "soc_achieved": 48
    },
    {
      "time_start": "2014-05-01T05:01:00",
      "location": 'NA',
      "cost_of_charging": 0,
      "price": 3.4,
      "duration": 3600,
      "energy": 0,
      "power": 0,
      "interval_type": "NCRH",
      "economic_savings": 0,
      "co2_impact": 0,
      "soc_achieved": 48
    },
    {
      "time_start": "2014-05-01T05:01:00",
      "location": 'NA',
      "cost_of_charging": 0,
      "price": 3.4,
      "duration": 3600,
      "energy": 0,
      "power": 0,
      "interval_type": "NCRH",
      "economic_savings": 0,
      "co2_impact": 0,
      "soc_achieved": 48
    },
    {
      "time_start": "2014-05-01T06:01:00-",
      "location": "Home",
      "cost_of_charging": 11.5,
      "price": 3.4,
      "duration": 8200,
      "energy": 9.3,
      "power": 6.6,
      "interval_type": "CHR",
      "economic_savings": 0.25,
      "co2_impact": 0.4,
      "soc_achieved": 64
    }
  ]

  public lineChartData: ChartDataSets[] = [
    {data: this.generateSOC(), label: 'SOC , %', fill: false,},
    {data: this.generateCost(), label: 'Cost , $', fill: false,},
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: false,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(211,212,212,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: '#FFB200',
      borderColor: '#FFB200',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: '#34B53A',
      borderColor: '#34B53A',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';



  ngOnInit() {
    this.generateCost();
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  generateCost() {
    const costArray = [];
    this.intervals.filter(item => costArray.push(item.price));
    console.log(costArray);
    return costArray
  }

  generateSOC() {
    const costSoc = [];
    this.intervals.filter(item => costSoc.push(item.energy / 800 *100));
    console.log(costSoc);
    return costSoc
  }

  private generateNumber(i: number) {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


  public changeColor() {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel() {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
    // this.chart.update();
  }
}
