import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {MapInfoWindow, MapMarker} from "@angular/google-maps";
import {RequestPopupComponent} from "./request-popup/request-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";
import {PoliciesService} from "../../../services/policies.service";


@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss'],
})


export class ResourceComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private matDialog: MatDialog,
              private policiesService: PoliciesService) {}

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  @ViewChild('progressBar') progressBar: ElementRef;
  loaderState = false;
  loaderStateGeo = false;
  selectedTab = 0;

  resource;
  station_locations = [];
  resourceSmartCar: any = {};
  intervals = [];

  idResource: number;
  favoritePolice;
  useCalendarFlag: boolean;
  loadChartFlag: boolean;
  policyId = 1;
  
  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }


  favoritePolices = [
    {name: 'Minimize CO2 emission', active: false},
    {name: 'Minimize costs', active: false},
    {name: 'Monetary savings', active: false},
    {name: 'Charge car as fast as possible', active: false}];

  ngOnInit(): void {
    this.policiesService.getPoliciesList();
         
   

    this.activatedRoute.paramMap.subscribe(res => {
      this.idResource = +res.get('idResource');
      const carId: number  = Number(localStorage.getItem('carId'));
      this.loadCalcGeo();
      this.loadChargeSchedule();
      //this.loadDrivingSchedule();

      if (carId === this.idResource && this.idResource > 0) {
 
        this.resourceSmartCar = JSON.parse(localStorage.getItem('smartCarInfo')) || <any>{};
        this.intervals = JSON.parse(localStorage.getItem('intervals')) || [];
        this.station_locations = JSON.parse(localStorage.getItem('station_locations'));;
      
      } 

      this.authService.getResourceDataById(this.idResource).subscribe((res: any) => {
        localStorage.setItem('resourceInfo', JSON.stringify(res.resourceInfo))
      })

      this.authService.getResourceSmartById(this.idResource).pipe((catchError(err => {
          this.loaderState = false;
        
          return throwError(err);
        }))
      ).subscribe((res: any) => {
        console.log("smartCar", res);

        this.loaderState = false;
        if (res) {
          this.resourceSmartCar = res.smartCarInfo;
          localStorage.setItem('smartCarInfo', JSON.stringify(this.resourceSmartCar));
          localStorage.setItem('carId', JSON.stringify(this.idResource));
        
          this.resource = res.smResource;
          this.favoritePolices[this.resource.policyId - 1].active = true;
     
          //this.selectedTab = res.smartCarInfo?.charge?.data?.isPluggedIn === 'true' ? 1 : 0;
          //this.selectedTab === 1 ? this.loadChargeSchedule() : this.loadDrivingSchedule();
          if(this.resourceSmartCar && this.resourceSmartCar.location) {
            /*this.markerPositions.push({
              lat: this.resourceSmartCar.location.data.latitude,
              lng: this.resourceSmartCar.location.data.longitude
            })*/
           // this.progressBar.nativeElement.style.width = (this.resourceSmartCar.battery.percentRemaining * 100) + '%';
           // if (this.selectedTab === 1) this.progressBar.nativeElement.classList.add('active-charge');
          }
          
          //this.progressBar.nativeElement.style.width < 50 ? this.progressBar.nativeElement.style.background = '#CD3E22' : this.progressBar.nativeElement.style.background = '#54cb46d6';
        }
      });
 
    });

    this.authService.getJwtToken().subscribe(res=> {
      console.log(res)
    })
  }

  loadChargeSchedule() {
    this.authService.calculateCharing(this.idResource).pipe(tap((res: any) => {
      if (res.status === 500) {
        this.loaderState = false;
        this.authService.getScheduleById(this.idResource, 'CHR').subscribe((res: any) => {
          if (res) {
            this.intervals = res.intervals;
            this.loaderState = false;
          }
        })
      }
    })).subscribe(res => {
      this.loaderState = false;
    })
  }

  loadDrivingSchedule() {
    this.authService.getDrivingScheduleById(this.idResource).pipe
    (
      (catchError(err => {
        localStorage.removeItem('station_locations');
        localStorage.removeItem('intervals');
        return throwError(err);
      }))).subscribe((res: any) => {
      if (res) {
        localStorage.setItem('schedule', JSON.stringify(res.intervals));
        this.loaderState = false;
        this.intervals = res.intervals
      }
    })
  }

  loadCalcGeo() {
    this.loaderState = false;
    this.authService.calculateGeo(this.idResource).subscribe((res: any) => {
      this.loaderStateGeo = false;
      if(res.intervals) {
        console.log("loadCalcGeo", res.intervals);
        this.intervals = res.intervals;
        this.station_locations = res.intervals[0].station_locations;
        localStorage.setItem('station_locations', JSON.stringify(this.station_locations));
        localStorage.setItem('intervals', JSON.stringify(this.intervals));
      }
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

  round(soc: number) {
    return Math.round(soc * 100)
  }
  getClass(soc: number) {
    const newSoc = this.round(soc);
    if(newSoc > 50) {
      return "success";
    }
    if(newSoc < 30) {
      return "error";
    }
    return "";
  }
}
