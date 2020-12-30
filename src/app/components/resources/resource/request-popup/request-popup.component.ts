import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PoliciesService} from "../../../../services/policies.service";
import { RegistrationService } from "src/app/services/registration.service";
import { catchError } from "rxjs/internal/operators/catchError";
import { HttpErrorResponse } from "@angular/common/http";
import { _SnackBarContainer } from "@angular/material/snack-bar";
import { MySnackbarService } from 'src/app/services/snackbar.service';
import { of } from "rxjs";
import { tap } from "rxjs/operators";

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
              private _snackBar: MySnackbarService,
              private activatedRoute: ActivatedRoute,
              private _registrationService: RegistrationService,
              public policiesService: PoliciesService) {
  }

  ngOnInit() {
    this.idResource = this.resource.id;
  }


  closeEvent() {
    this.dialogRef.close();
  }

  syncWidthCalendar() {

    this.authService.needInitSmartCarSession().subscribe(res => {
      console.log(res);
    })
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

  deleteInterval(index: number) {
    this.driveSchedule.intervals.splice(index, 1)
  }

  createRequest() {
    this.authService.putScheduleById(this.idResource, this.driveSchedule).pipe(  tap((res: any) => {
      if (res.status === 200) {
        const urlTree = this.router.createUrlTree([], {
          queryParams: { sh: "driving"  },
          queryParamsHandling: "merge",
          preserveFragment: true });
          console.log(urlTree);
        this.router.navigateByUrl(urlTree); 
        this.closeEvent();
      } 
    }), catchError(({ error }: HttpErrorResponse) => {
      this._snackBar.openErrorSnackBar(error.message || "Something went wrong!");
      return of(error.message);
    })).subscribe();

  }

  basedOnGeo() {
    this.authService.calculateGeo(this.idResource).subscribe()
    this.closeEvent()
  }
}
