import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {EditResourcePopupComponent} from "../popups/edit-resource-popup/edit-resource-popup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html'
})


export class DropDownComponent {
  dropDownOpen = false;
  @Input() resourceData;
  constructor(private router: Router,
              private matDialog: MatDialog,
  ) {
  }

  switchDropDownState() {
    this.dropDownOpen = !this.dropDownOpen;
  }

  openEditResource() {
    const dialogConf: any = {
      data: this.resourceData, panelClass: 'edit-resource-dialog', closeOnNavigation: true, autoFocus: false
    };
    const dialogRef = this.matDialog.open(EditResourcePopupComponent, dialogConf);
    dialogRef.afterClosed().subscribe(
      unixEvent => {
        if (unixEvent) {
        }
      }
    );
  }
}

