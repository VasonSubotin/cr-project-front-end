import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TYPES } from 'src/app/constants/authTypes';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  logoutShow = true;
  account = { login: 'test' };
  private subscriptions$ = [];

  constructor(
    private _router: Router,
    public registrationService: RegistrationService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.subscriptions$.forEach((s$) => {
      s$.unsubscribe();
    });
  }

  ngOnInit(): void {
    const request$  = this._activatedRoute.queryParams.subscribe((params) => {
      const smartCarToken = params['code'];
      const type = params['type'];

      if (type === TYPES.GOOGLE && smartCarToken) {
        return this.registrationService.googleAuthenticate(smartCarToken).subscribe(
          (res: any) => {
            localStorage.setItem('token', res.body.token);
            this.readAccount();
          },
          (error) => {
            if (error.status === 500) {
              this.readAccount();
            }
          }
        );
      }
      this.readAccount(); 
    });
    this.subscriptions$.push(request$);
  }

  readAccount() {
    const request$ = this.registrationService
      .accountInfo()
      .subscribe((res: any) => (this.account = res));
    this.subscriptions$.push(request$);
  }

  routeByLink(link: string) {
    this._router.navigate([`/${link}`]);
  }

  switchLogout() {
    this.logoutShow = !this.logoutShow;
  }
}
