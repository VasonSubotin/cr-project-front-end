import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-request-popup',
  templateUrl: './request-popup.component.html'
})


export class RequestPopupComponent {
  successSync = false;
  policyForSelect = [];
  constructor(@Inject(MAT_DIALOG_DATA) public resource,
              private dialogRef: MatDialogRef<RequestPopupComponent>,
              private authService: AuthService) {

  }

  closeEvent() {
    this.dialogRef.close();
  }

  syncWidthCalendar() {
    this.successSync = !this.successSync;
    this.authService.getDrivingScheduleById(this.resource.idResource).subscribe(res => {
        if (res) {

        }
      }
    )
  }
  onChange(){

  }
  basedOnGeo() {
    this.authService.calculateGeo(this.resource.idResource).subscribe()
    this.closeEvent()
  }
}
