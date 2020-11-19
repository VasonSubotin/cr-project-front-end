import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  logoutShow = true;

  constructor(private router: Router) {}

  routeByLink(link: string) {
    this.router.navigate([`/${link}`]);
  }
  
  switchLogout() {
    this.logoutShow = !this.logoutShow;
  }
}
