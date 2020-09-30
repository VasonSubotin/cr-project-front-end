import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})


export class LogoutComponent {
  constructor(private router: Router) {
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('smartCarToken');
    this.router.navigate(['/login'])
  }
}
