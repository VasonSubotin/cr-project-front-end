import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {AuthService} from "../../../../services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {ChartDataSets, ChartOptions} from 'chart.js';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import * as moment from 'moment'; // add this 1 of 4


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html'
})


export class ScheduleComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
  }

  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;
  @Input() battery: any;
  chargeSchedule = {
    "moers": {
      "start": 1603497600000,
      "stop": 1603587600000,
      "point_time": "2020-10-24T12:00:00.000Z",
      "datatype": "MOER",
      "frequency": 300,
      "market": "RTM",
      "ba": "CAISO_ZP26",
      "values": [
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        865.977867473876,
        973.002345077557,
        865.977867473876,
        865.977867473876,
        865.977867473876,
        865.977867473876,
        865.977867473876,
        865.977867473876,
        865.977867473876,
        973.002345077557,
        973.002345077557,
        865.977867473876,
        943.495941482572,
        943.495941482572,
        943.495941482572,
        943.495941482572,
        943.495941482572,
        943.495941482572,
        943.495941482572,
        943.495941482572,
        943.495941482572,
        939.341223992826,
        939.341223992826,
        939.341223992826,
        939.341223992826,
        939.341223992826,
        939.341223992826,
        939.341223992826,
        939.341223992826,
        939.341223992826,
        939.341223992826,
        932.865535488803,
        939.341223992826,
        932.865535488803,
        932.865535488803,
        932.865535488803,
        927.185955448561,
        927.185955448561,
        927.185955448561,
        927.185955448561,
        927.185955448561,
        927.185955448561,
        927.185955448561,
        927.185955448561,
        927.185955448561,
        927.185955448561,
        927.185955448561,
        905.963911628273,
        903.066427847507,
        903.066427847507,
        898.946360001513,
        898.946360001513,
        898.946360001513,
        898.946360001513,
        898.946360001513,
        898.946360001513,
        898.946360001513,
        898.946360001513,
        898.946360001513,
        898.946360001513,
        901.454118203677,
        901.454118203677,
        901.454118203677,
        901.454118203677,
        901.454118203677,
        901.454118203677,
        901.454118203677,
        900.92194650714,
        900.92194650714,
        900.92194650714,
        900.92194650714,
        900.92194650714,
        818.200078373474,
        818.200078373474,
        818.200078373474,
        829.299419173203,
        889.206205726534,
        829.299419173203,
        889.206205726534,
        896.882127910265,
        896.882127910265,
        889.206205726534,
        896.882127910265,
        896.882127910265,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        838.660709781008,
        829.299419173203,
        829.299419173203,
        829.299419173203,
        829.299419173203,
        829.299419173203,
        829.299419173203,
        829.299419173203,
        829.299419173203,
        829.299419173203,
        829.299419173203,
        818.200078373474,
        818.200078373474,
        818.200078373474,
        819.940409091699,
        819.940409091699,
        819.940409091699,
        820.53882445871,
        889.206205726534,
        889.206205726534,
        889.206205726534,
        889.206205726534,
        374.402612937488,
        374.402612937488,
        375.297734814461,
        889.206205726534,
        889.206205726534,
        889.206205726534,
        891.332120184345,
        891.332120184345,
        891.332120184345,
        891.332120184345,
        891.332120184345,
        891.332120184345,
        891.332120184345,
        894.583837997222,
        894.583837997222,
        894.583837997222,
        891.332120184345,
        891.332120184345,
        891.332120184345,
        891.332120184345,
        891.332120184345,
        894.583837997222,
        894.583837997222,
        894.583837997222,
        895.347548170441,
        895.347548170441,
        895.347548170441,
        895.347548170441,
        897.585313820026,
        897.585313820026,
        897.585313820026,
        897.585313820026,
        897.585313820026,
        897.585313820026,
        897.585313820026,
        897.585313820026,
        897.585313820026,
        901.454118203677,
        901.454118203677,
        901.454118203677,
        901.454118203677,
        901.454118203677,
        901.454118203677,
        901.454118203677,
        901.454118203677,
        901.454118203677,
        901.454118203677,
        901.454118203677,
        901.454118203677,
        898.946360001513,
        898.946360001513,
        903.066427847507,
        903.066427847507,
        903.066427847507,
        905.963911628273,
        903.066427847507,
        903.066427847507,
        905.963911628273,
        905.963911628273,
        927.185955448561,
        932.865535488803,
        932.865535488803,
        932.865535488803,
        939.341223992826,
        939.341223992826,
        939.341223992826,
        939.341223992826,
        939.341223992826,
        939.341223992826,
        943.495941482572,
        943.495941482572,
        943.495941482572,
        943.495941482572,
        943.495941482572,
        939.341223992826,
        943.495941482572,
        943.495941482572,
        943.495941482572,
        943.495941482572,
        943.495941482572,
        943.495941482572,
        973.002345077557,
        973.002345077557,
        943.495941482572,
        973.002345077557,
        943.495941482572,
        943.495941482572,
        973.002345077557,
        973.002345077557,
        973.002345077557,
        973.002345077557,
        973.002345077557,
        973.002345077557,
        973.002345077557,
        973.002345077557,
        973.002345077557,
        973.002345077557,
        973.002345077557,
        973.002345077557,
        973.002345077557,
        973.002345077557,
        973.002345077557,
        973.002345077557,
        973.002345077557,
        973.002345077557,
        973.002345077557,
        973.002345077557
      ],
      "version": "2.1.1"
    },
    "schedule_id": 4,
    "session_id": 4,
    "account_id": 3,
    "policy_id": 1,
    "resource_id": 3,
    "location_id": null,
    "initial_energy": 47500,
    "end_soc": 99.98,
    "capacity": 95000,
    "total_charge": 47481,
    "total_cost": 0.0,
    "session_type": null,
    "schedule_type": "CHR",
    "co2_impact": 3841.866602144562,
    "start_time": null,
    "end_time": null,
    "create_time": "2020-10-24T05:57:47+0000",
    "co2_savings": 471.93458817158216,
    "monetary_savings": 0.0,
    "intervals": [
      {
        "time_start": "2020-10-24T00:00:00.000+0000",
        "calendar_location": null,
        "station_locations": null,
        "duration": 300000,
        "power": 10000,
        "energy": 833,
        "soc_achieved": 0,
        "primary_trigger": null,
        "interval_type": "CHR",
        "co2_impact": 69.88839248175066,
        "price": 0.0,
        "cost_of_charging": 0.0,
        "economic_savings": 0.0
      },
      {
        "time_start": "2020-10-24T00:10:00.000+0000",
        "calendar_location": null,
        "station_locations": null,
        "duration": 3000000,
        "power": 10000,
        "energy": 8330,
        "soc_achieved": 0,
        "primary_trigger": null,
        "interval_type": "CHR",
        "co2_impact": 698.8839248175066,
        "price": 0.0,
        "cost_of_charging": 0.0,
        "economic_savings": 0.0
      },
      {
        "time_start": "2020-10-24T07:00:00.000+0000",
        "calendar_location": null,
        "station_locations": null,
        "duration": 1200000,
        "power": 10000,
        "energy": 3332,
        "soc_achieved": 0,
        "primary_trigger": null,
        "interval_type": "CHR",
        "co2_impact": 273.6583045244687,
        "price": 0.0,
        "cost_of_charging": 0.0,
        "economic_savings": 0.0
      },
      {
        "time_start": "2020-10-24T07:25:00.000+0000",
        "calendar_location": null,
        "station_locations": null,
        "duration": 300000,
        "power": 10000,
        "energy": 833,
        "soc_achieved": 0,
        "primary_trigger": null,
        "interval_type": "CHR",
        "co2_impact": 69.10828493110024,
        "price": 0.0,
        "cost_of_charging": 0.0,
        "economic_savings": 0.0
      },
      {
        "time_start": "2020-10-24T08:00:00.000+0000",
        "calendar_location": null,
        "station_locations": null,
        "duration": 6300000,
        "power": 10000,
        "energy": 17493,
        "soc_achieved": 0,
        "primary_trigger": null,
        "interval_type": "CHR",
        "co2_impact": 1467.6562421167632,
        "price": 0.0,
        "cost_of_charging": 0.0,
        "economic_savings": 0.0
      },
      {
        "time_start": "2020-10-24T14:00:00.000+0000",
        "calendar_location": null,
        "station_locations": null,
        "duration": 5100000,
        "power": 10000,
        "energy": 14161,
        "soc_achieved": 0,
        "primary_trigger": null,
        "interval_type": "CHR",
        "co2_impact": 1168.9962065488546,
        "price": 0.0,
        "cost_of_charging": 0.0,
        "economic_savings": 0.0
      },
      {
        "time_start": "2020-10-24T15:45:00.000+0000",
        "calendar_location": null,
        "station_locations": null,
        "duration": 900000,
        "power": 10000,
        "energy": 2499,
        "soc_achieved": 0,
        "primary_trigger": null,
        "interval_type": "CHR",
        "co2_impact": 93.67524672411975,
        "price": 0.0,
        "cost_of_charging": 0.0,
        "economic_savings": 0.0
      }
    ]
  }

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: false,
    steppedLine: true,

    scales: {
      xAxes: [
        {
          id: 'xAxis1',
          time: {
            max: '1603587600000',
            min: '1603497600000',
            parser: 'mm',
            unit: 'minute',
            stepSize: 5,
            displayFormats: {
              'minute': 'HH:mm',
              'hour': 'DD HH:mm'
            }
          }
        },
     /*   {
        type: 'time',
        ticks: {
          maxRotation: 90,
          minRotation: 80
        },
        time: {
          parser: 'DD HH:mm',
          tooltipFormat: 'DD HH:mm',
          unit: 'minute',
          //stepSize: 15,
          displayFormats: {
            'minute': 'DD HH:mm',
            'hour': 'DD HH:mm'
          }
        }
      }*/],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          type: 'linear',
          ticks: {
            stepValue: 10,
            max: 100,
          }
        },
        {
          id: 'y-axis-1',
          position: 'right',
          type: 'linear',
          ticks: {
            fontColor: 'red',
            beginAtZero: true

          }
        },
        {
          id: 'y-axis-2',
          position: 'right',
          type: 'linear',
          ticks: {
            beginAtZero: true
          }
        }
      ]
    },
    annotation: {
      /*   annotations: [
           {
             type: 'line',
             mode: 'vertical',
             scaleID: 'y-axis-1',
             value: 'March',
             borderColor: 'orange',
             borderWidth: 2,
             label: {
               enabled: true,
               fontColor: 'orange',
               content: 'LineAnno'
             }
           },
         ],*/
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
    { // dark grey
      backgroundColor: '#34B53A',
      borderColor: '#34B53A',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
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


  ngOnInit() {
    this.lineChartData = [
     // {data: this.generateSOC(), label: 'SOC , %', fill: false, type: 'line', lineTension: 0, yAxisID: 'y-axis-0'},
      {data: this.generateMoers(), label: 'MO , %', fill: false, type: 'line', lineTension: 0, yAxisID: 'y-axis-2',},
     // {data: this.generatePower(), label: 'Power , kWh', fill: false, type: 'bar', yAxisID: 'y-axis-1'}
    ]

   /* */
      this.lineChartLabels = this.chargeSchedule.moers.values;

/*
    this.lineChartLabels.unshift("2020-10-22T13:10:00.000+0000")
*/

    // this.generateCost();
    console.log(this.convertData());
    //this.lineChartLabels = this.convertData();
    console.log(this.lineChartLabels)

  }

  convertData() {
    return this.chargeSchedule.intervals.map((item: any) => {
      //item = moment(item).add(900000, 'seconds');
      //console.log('added duration', moment(item).format("HH:mm:ss"))
      return moment(item.time_start).format("DD HH:mm:ss")
    })

  }

  generateCost() {
    const costArray = [];
    this.chargeSchedule.intervals.map(item => costArray.push(item.price));
    console.log(costArray);
    return costArray
  }

  generatePower() {
    const powerArray = [];
    this.chargeSchedule.intervals.map(item => powerArray.push(item.power));
    console.log(powerArray);
    return powerArray
  }

  generateSOC() {

    this.chargeSchedule.intervals[0].energy = this.chargeSchedule.intervals[0].energy + (this.chargeSchedule.initial_energy);
    const costSoc = [];
    const reducedEnergy = this.chargeSchedule.intervals.map((item, index, array): any => {
      if (index !== 0) {
        item.energy = item.energy + array[index - 1].energy;
      }
      costSoc.push((item.energy / this.chargeSchedule.capacity) * 100);
      return
    })
    //this.chargeSchedule.intervals.map(item => costSoc.push(item.energy));
    costSoc.unshift((this.chargeSchedule.initial_energy / this.chargeSchedule.capacity) * 100)
    console.log(costSoc);
    return costSoc
  }

  generateMoers() {
    let moers = [];
    moers = this.chargeSchedule.moers.values
    console.log(moers)
    return moers
  }

  // events
  public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
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
