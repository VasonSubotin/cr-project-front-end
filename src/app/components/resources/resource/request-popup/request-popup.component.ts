import {Component, Inject, Input} from "@angular/core";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-request-popup',
  templateUrl: './request-popup.component.html'
})


export class RequestPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public resource,
              private dialogRef: MatDialogRef<RequestPopupComponent>,
              private authService: AuthService) {
    console.log(this.resource)

  }
  closeEvent() {
    this.dialogRef.close();
  }
  syncCalendar(){
    this.closeEvent()

  }
  basedOnGeo() {
    this.authService.calculateGeo(this.resource.idResource).subscribe()
    this.closeEvent()
  }
}
