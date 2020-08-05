import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html'
})


export class DropDownComponent {
  dropDownOpen = false;

  constructor(private router: Router) {
  }

  switchDropDownState() {
    this.dropDownOpen = !this.dropDownOpen;
  }

  openEditResource() {

  }
}

