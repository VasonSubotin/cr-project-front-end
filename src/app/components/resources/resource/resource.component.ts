import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {MapInfoWindow, MapMarker} from "@angular/google-maps";
import {RequestPopupComponent} from "./request-popup/request-popup.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html'
})


export class ResourceComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private matDialog: MatDialog) {


  }
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  intervals= [
    {  "start_time": "2014-05-01T05:00:00-",
      "location": "Location A",
      "cost_of_charging": 11.5,
      "price": 3.4,
      "duration":60,
      "energy":9.3,
      "power": 6.6,
      "interval_type": "CHR",
      "co2_impact": 0,
      "soc_achieved": 58
    },
    {  "time_start": "2014-05-01T05:01:00",
      "location": 'NA',
      "cost_of_charging": 0,
      "price": 3.4,
      "duration":3600,
      "energy":0,
      "power": 0,
      "interval_type": "NCRH",
      "economic_savings": 0,
      "co2_impact": 0,
      "soc_achieved": 48
    },
    {  "time_start": "2014-05-01T05:01:00",
      "location": 'NA',
      "cost_of_charging": 0,
      "price": 3.4,
      "duration":3600,
      "energy":0,
      "power": 0,
      "interval_type": "NCRH",
      "economic_savings": 0,
      "co2_impact": 0,
      "soc_achieved": 48
    },
    {  "time_start": "2014-05-01T05:01:00",
      "location": 'NA',
      "cost_of_charging": 0,
      "price": 3.4,
      "duration":3600,
      "energy":0,
      "power": 0,
      "interval_type": "NCRH",
      "economic_savings": 0,
      "co2_impact": 0,
      "soc_achieved": 48
    },
    {  "time_start": "2014-05-01T05:01:00",
      "location": 'NA',
      "cost_of_charging": 0,
      "price": 3.4,
      "duration":3600,
      "energy":0,
      "power": 0,
      "interval_type": "NCRH",
      "economic_savings": 0,
      "co2_impact": 0,
      "soc_achieved": 48
    },
    {  "time_start": "2014-05-01T05:01:00",
      "location": 'NA',
      "cost_of_charging": 0,
      "price": 3.4,
      "duration":3600,
      "energy":0,
      "power": 0,
      "interval_type": "NCRH",
      "economic_savings": 0,
      "co2_impact": 0,
      "soc_achieved": 48
    },
    {  "time_start": "2014-05-01T06:01:00-",
      "location": "Home",
      "cost_of_charging": 11.5,
      "price": 3.4,
      "duration":8200,
      "energy":9.3,
      "power": 6.6,
      "interval_type": "CHR",
      "economic_savings": 0.25,
      "co2_impact": 0.4,
      "soc_achieved": 64
    }
  ]

  resource;
  idResource: number;
  favoritePolice;
  useCalendarFlag: boolean;
  loadChartFlag: boolean;
  policyId = 1;

  center = {lat: 24, lng: 12};
  markerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 4;
  display?: google.maps.LatLngLiteral;

  move(event: google.maps.MouseEvent) {
    this.display = event.latLng.toJSON();
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  removeLastMarker() {
    this.markerPositions.pop();
  }
  favoritePolices = [
    {name: 'Minimize CO2 emission', active: false},
    {name: 'Minimize costs', active: false},
    {name: 'Monetary savings', active: false},
    {name: 'Charge car as fast as possible', active: false}];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(res => {
      this.idResource = +res.get('idResource');
      this.authService.getResourceById(this.idResource).subscribe((res: any) => {
        this.resource = res;
        this.favoritePolices[res.policyId - 1].active = true
      })
      this.authService.acccInfo(this.idResource).subscribe((res: any) => {

      })
    });
    this.authService.getScheduleById(this.idResource).subscribe(res => {
      console.log(res)
    })
  }
  loadChart() {
    if (!this.loadChartFlag) {
      this.loadChartFlag = !this.loadChartFlag;
    }
  }

  openSchedule() {
    this.router.navigate([`/resource/schedule/${this.idResource}`])
  }

  updateResource(policyId) {
    this.resource.policyId = policyId;
    this.resource.idResource = this.idResource;
    const body = this.resource;
    this.authService.updateResourceById(this.idResource, body).subscribe((res: any) => {
      this.resource = res;
    })
  }

  openRequestModal() {
    console.log(this.resource)
    const dialogConf: any = {
      data: this.resource, panelClass: 'create-request-dialog', closeOnNavigation: true, autoFocus: false
    };
    const dialogRef = this.matDialog.open(RequestPopupComponent, dialogConf);
    dialogRef.afterClosed().subscribe(
      unixEvent => {
        if (unixEvent) {
        }
      }
    );
  }
  changePolicy(policyId) {
    this.updateResource(policyId);
  }
}
