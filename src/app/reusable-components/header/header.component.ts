import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  logoutShow = true;
  account = {login: "test"};

  constructor(private _router: Router, public registrationService: RegistrationService ) {}

  ngOnInit(): void {
    this.registrationService.accountInfo().subscribe((res: any) => this.account = res);
  }

  routeByLink(link: string) {
    this._router.navigate([`/${link}`]);
  }
  
  switchLogout() {
    this.logoutShow = !this.logoutShow;
  }
}
