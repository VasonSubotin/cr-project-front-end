import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {MapInfoWindow, MapMarker} from "@angular/google-maps";
import {RequestPopupComponent} from "./request-popup/request-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";


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
  @ViewChild('progressBar') progressBar: ElementRef;
  loaderState = true;
  selectedTab = 2;
  /*Name:m
  Key ID:F56BZ5WVSG
  Services:MapKit JS*/
  intervals = [
    /*   {
         "start_time": "2014-05-01T05:00:00-",
         "location": "Location A",
         "cost_of_charging": 11.5,
         "price": 3.4,
         "duration": 60,
         "energy": 9.3,
         "power": 6.6,
         "interval_type": "CHR",
         "co2_impact": 0,
         "soc_achieved": 58
       },*/
  ]
  locations = [
    ['Bondi Beach', -33.890542, 151.274856, 4],
    ['Coogee Beach', -33.923036, 151.259052, 5],
    ['Cronulla Beach', -34.028249, 151.157507, 3],
    ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
    ['Maroubra Beach', -33.950198, 151.259302, 1]
  ];

  resource;
  resourceSmartCar;
  idResource: number;
  favoritePolice;
  useCalendarFlag: boolean;
  loadChartFlag: boolean;
  policyId = 1;

  center = {lat: 38.74014171287381, lng: -122.42073208468675};
  markerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 6;
  display?: google.maps.LatLngLiteral;

  move(event: google.maps.MouseEvent) {
    this.display = event.latLng.toJSON();
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }


  addMarker(event: google.maps.MouseEvent) {
    this.markerPositions.push(event.latLng.toJSON());
    console.log(this.markerPositions)
  }

  favoritePolices = [
    {name: 'Minimize CO2 emission', active: false},
    {name: 'Minimize costs', active: false},
    {name: 'Monetary savings', active: false},
    {name: 'Charge car as fast as possible', active: false}];

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(res => {
      this.idResource = +res.get('idResource');
      this.authService.getResourceSmartById(this.idResource).pipe((catchError(err => {
          this.loaderState = false;
          return throwError(err);
        }))
      ).subscribe((res: any) => {

        this.loaderState = false;
        if (res) {
          this.resourceSmartCar = res.smartCarInfo;
          this.resource = res.smResource;
          this.favoritePolices[this.resource.policyId - 1].active = true;
          this.selectedTab = res.smartCarInfo?.charge?.data?.isPluggedIn === 'true' ? 1 : 0;
          this.selectedTab === 1 ? this.loadChargeSchedule() : this.loadDrivingSchedule();
          this.markerPositions.push({
            lat: this.resourceSmartCar.location.data.latitude,
            lng: this.resourceSmartCar.location.data.longitude
          })
          this.progressBar.nativeElement.style.width = this.resourceSmartCar.battery.percentRemaining + '%';
          if (this.selectedTab === 1) this.progressBar.nativeElement.classList.add('active-charge');
          //this.progressBar.nativeElement.style.width < 50 ? this.progressBar.nativeElement.style.background = '#CD3E22' : this.progressBar.nativeElement.style.background = '#54cb46d6';
        }
      });
    });


  }

  loadChargeSchedule() {
    this.authService.calculateCharing(this.idResource).pipe(tap((res: any) => {
      if (res.status === 500) {
        this.loaderState = false;
        this.authService.getScheduleById(this.idResource).subscribe((res: any) => {
          this.intervals = res.intervals;
          this.loaderState = false;
        })
      }
    })).subscribe(res => {
      this.loaderState = false;
    })
  }

  loadDrivingSchedule() {
    this.authService.getScheduleById(this.idResource).pipe
    (tap((res: any) => {
        if (!res) {
          this.loadCalcGeo();
        }
      }),
      (catchError(err => {
        this.loadCalcGeo();
        return throwError(err);
      }))).subscribe((res: any) => {
      this.loaderState = false;
      this.intervals = res.intervals
    })
  }

  loadCalcGeo() {
    this.loaderState = false;
    this.authService.calculateGeo(this.idResource).subscribe((res: any) => {
      this.loaderState = false;
      this.intervals = res.intervals
    })
  }

  loadChart() {
    if (!this.loadChartFlag) {
      this.loadChartFlag = !this.loadChartFlag;
    }
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
    if (this.selectedTab === 1) {
      this.selectedTab = 1;
      return
    }
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
