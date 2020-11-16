import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})


export class HeaderComponent {
  logoutShow = true;
  constructor(private router: Router) {
  }
  routeByLink (link){
    this.router.navigate([`/${link}`])
  }
  switchLogout() {
    this.logoutShow = !this.logoutShow;
  }
}
