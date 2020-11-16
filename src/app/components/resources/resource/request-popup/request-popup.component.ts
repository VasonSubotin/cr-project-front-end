import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PoliciesService} from "../../../../services/policies.service";

@Component({
  selector: 'app-request-popup',
  templateUrl: './request-popup.component.html'
})


export class RequestPopupComponent implements OnInit {
  successSync = false;
  idResource;
  policyForSelect: any = [
    {value: 0, name: 'green policy. (optimized to CO2 marginal emission)'},
    {value: 1, name: 'monetary policy (optimized to energy market pricing)'},
    {value: 2, name: 'CO2 - Minimize CO2 emission'}
  ];
  driveSchedule = JSON.parse(localStorage.getItem('driveSchedule')) || [];

  constructor(@Inject(MAT_DIALOG_DATA) public resource,
              private dialogRef: MatDialogRef<RequestPopupComponent>,
              private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public policiesService: PoliciesService) {
  }

  ngOnInit() {
    this.idResource = this.router.url.split("/")[2];
  }

  closeEvent() {
    this.dialogRef.close();
  }

  syncWidthCalendar() {
    this.successSync = !this.successSync;
    this.authService.getDrivingScheduleById(this.idResource).subscribe(res => {
        if (res) {
          this.driveSchedule = res;
          console.log(this.driveSchedule)

          localStorage.setItem('schedule', JSON.stringify(res));
          localStorage.setItem('driveSchedule', JSON.stringify(res));
        }
      }
    )
  }

  addNewInterval() {
    this.driveSchedule.intervals.push({})
  }

  deleteInterval(index) {
    this.driveSchedule.intervals.splice(index, 1)
  }

  createRequest() {
    this.authService.putScheduleById(this.idResource, this.driveSchedule).subscribe((res) => {
      console.log(res)
    });
    this.closeEvent();
  }

  basedOnGeo() {
    this.authService.calculateGeo(this.idResource).subscribe()
    this.closeEvent()
  }
}
