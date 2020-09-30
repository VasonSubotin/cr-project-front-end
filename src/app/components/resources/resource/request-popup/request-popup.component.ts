import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-request-popup',
  templateUrl: './request-popup.component.html'
})


export class RequestPopupComponent implements OnInit{
  successSync = false;
  idResource;
  policyForSelect = [];
  constructor(@Inject(MAT_DIALOG_DATA) public resource,
              private dialogRef: MatDialogRef<RequestPopupComponent>,
              private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
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

        }
      }
    )
  }
  onChange(){

  }
  basedOnGeo() {
    this.authService.calculateGeo(this.idResource).subscribe()
    this.closeEvent()
  }
}
