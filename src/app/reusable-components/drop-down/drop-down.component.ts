import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Router} from "@angular/router";
import {EditResourcePopupComponent} from "../popups/edit-resource-popup/edit-resource-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {catchError} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html'
})


export class DropDownComponent {
  dropDownOpen = false;
  @Input() resourceData;
  @Output() resourceDelete = new EventEmitter<any>();;
  constructor(private router: Router,
              private matDialog: MatDialog,
              private authService: AuthService
  ) {
  }

  switchDropDownState() {
    this.dropDownOpen = !this.dropDownOpen;
  }

  openEditResource() {
    const dialogConf: any = {
      data: this.resourceData.smResource, panelClass: 'edit-resource-dialog', closeOnNavigation: true, autoFocus: false
    };
    const dialogRef = this.matDialog.open(EditResourcePopupComponent, dialogConf);
    this.switchDropDownState();
    dialogRef.afterClosed().subscribe(
      unixEvent => {
        if (unixEvent) {
        }
      }
    );
  }
  deleteResource() {
    this.switchDropDownState();
    this.resourceDelete.emit();
    this.authService.deleteResourcesById(this.resourceData.smResource.idResource).subscribe(res=> {

    })
    }
}

