import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {POLICIES} from "../../constants/policies";
import {catchError, tap} from "rxjs/operators";
import {EditResourcePopupComponent} from "../../reusable-components/popups/edit-resource-popup/edit-resource-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {request} from "../../constants/api";
import {throwError} from "rxjs";


@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html'
})


export class ResourcesComponent implements OnInit {
  constructor(private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private matDialog: MatDialog) {
  }

  policies: POLICIES;
  dataIsReady = false;
  loaderState = false;
  resourcesData = [];
  searchText;
  smartCarLogin = request.apiUrl + 'smartCarLogin';

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const code = params['code'];
      const type = params['type'];
      if (type === 'google') {
        this.getGoogleAuthenticate(params['code'])
/*

*/
      } else if (type === 'smartCar') {
        localStorage.setItem('smartCarToken', code);
      }
    });
    if (localStorage.getItem('smartCarToken')) {
      this.startSmartCarSession(localStorage.getItem('smartCarToken'))
    } else {
      this.startSmartCarSession(localStorage.getItem('smartCarToken'))

      this.loaderState = true;
    }
  }

  testEdit() {
    const dialogConf: any = {
      data: {}, panelClass: 'edit-resource-dialog', closeOnNavigation: true, autoFocus: false
    };
    const dialogRef = this.matDialog.open(EditResourcePopupComponent, dialogConf);
    dialogRef.afterClosed().subscribe(
      unixEvent => {
        if (unixEvent) {
        }
      }
    );
  }

  getGoogleAuthenticate(code) {
    this.authService.googleAuthenticate(code).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
        window.location.href = this.smartCarLogin;

      }
    )
  }

  startSmartCarSession(code) {
    this.authService.smartCarSession(code).pipe(tap((res: any) => {
      if (res.status === 200) {
        this.getResourcesArray();

      }
    })).subscribe(res => console.log(res),

      error => {
        if (error.status === 500) {
          /*  localStorage.removeItem('token');
            this.router.navigate(['/login'])*/
           this.getResourcesArray();

        }
      });
  }

  getResourcesArray() {
    this.authService.getResources().pipe(catchError(err => {
      this.loaderState = true;
      return throwError(err);
    })).subscribe((res: any) => {
      this.loaderState = true;
      this.resourcesData = res;
      this.dataIsReady = true;
    });

  }
  resourceDelete(index) {
    this.resourcesData.splice(index, 1)
  }
  navigateByResource(idResource, smResource) {

    this.router.navigate([`/resource/${idResource}`],)
  }
}
