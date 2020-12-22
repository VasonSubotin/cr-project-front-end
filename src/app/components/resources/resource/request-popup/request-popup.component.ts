import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PoliciesService} from "../../../../services/policies.service";
import { RegistrationService } from "src/app/services/registration.service";

@Component({
  selector: 'app-request-popup',
  templateUrl: './request-popup.component.html',
  styleUrls: ['./request-popup.component.scss']
})

export class RequestPopupComponent implements OnInit {
  successSync = false;
  idResource;

  driveSchedule = JSON.parse(localStorage.getItem('driveSchedule')) || [];

  constructor(@Inject(MAT_DIALOG_DATA) public resource,
              private dialogRef: MatDialogRef<RequestPopupComponent>,
              private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private _registrationService: RegistrationService,
              public policiesService: PoliciesService) {
  }

  ngOnInit() {
    this.idResource = this.router.url.split("/")[2];
  }

  closeEvent() {
    this.dialogRef.close();
  }

  syncWidthCalendar() {

    this._registrationService.checkAccount().subscribe(res => {
      console.log(res);
    })

    console.log("e");
    const requestGoogle$ = this._registrationService
    .googleLogin()
    .pipe()
    .subscribe(res => {
      console.log("res", res);
      //this._registrationService.googleAuthenticate()
    });

/*
    this.successSync = !this.successSync;
    this.authService.getDrivingScheduleById(this.idResource).subscribe(res => {
        if (res) {
          this.driveSchedule = res;
          console.log(this.driveSchedule)

          localStorage.setItem('schedule', JSON.stringify(res));
          localStorage.setItem('driveSchedule', JSON.stringify(res));
        }
      }
    )*/
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
