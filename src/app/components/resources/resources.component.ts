import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {POLICIES} from "../../constants/policies";
import {catchError, tap} from "rxjs/operators";
import {EditResourcePopupComponent} from "../../reusable-components/popups/edit-resource-popup/edit-resource-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {request} from "../../constants/api";
import {Observable, throwError} from "rxjs";
import {PoliciesService} from "../../services/policies.service";


@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})


export class ResourcesComponent implements OnInit {
  constructor(private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private matDialog: MatDialog,
              public policiesService: PoliciesService) {
  }

  policies: POLICIES;
  dataIsReady = false;
  loaderState = false;
  resourcesData = [];
  searchText;
  smartCarToken;
  smartCarLogin = request.apiUrl + 'smartCarLogin';

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.smartCarToken = params['code'];
      const type = params['type'];
      if (type === 'google') {
        this.getGoogleAuthenticate(params['code']);
      } else if (type === 'smartCar') {
        localStorage.setItem('smartCarToken', this.smartCarToken);
        if (localStorage.getItem('smartCarToken')) {
          this.startSmartCarSession(localStorage.getItem('smartCarToken'));
          this.loaderState = true;
        }
      } else {
        this.getResourcesFast();
      }
    });

    this.policiesService.getPoliciesList();
  }

  checkSmartCarToken() {
    this.authService.needInitSmartCarSession().pipe(
      catchError((error) => {
        this.loaderState = true;
        this.getResourcesArray();
        return error;
      })
    ).subscribe((res: any) => {
      if (res.needInit) {
        this.loaderState = true;
      } else {
        this.getResourcesArray();
      }
    })

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
    this.authService.googleAuthenticate(code)
      .subscribe((res: any) => {
          localStorage.setItem('token', res.body.token);
          this.getResourcesFast();
        },
        error => {
          if (error.status === 500) {
            this.getResourcesFast();
          }
        })

  }

  getResourcesFast() {
    let resourcesArray = [];
    this.authService.getResourcesFast().subscribe((res: any) => {
      if (res.length) {
        res.map((item, index) => {
          resourcesArray[index] = {};
          resourcesArray[index].smResource = res[index];

          this.checkSmartCarToken();
        })
        this.resourcesData = resourcesArray;

      } else {
        //  window.location.href = this.smartCarLogin;

      }


      /*else if (type === 'smartCar') {
        localStorage.setItem('smartCarToken', code);
        if (localStorage.getItem('smartCarToken')) {
          this.startSmartCarSession(localStorage.getItem('smartCarToken'))
        } else {
          this.startSmartCarSession(localStorage.getItem('smartCarToken'));
          this.loaderState = true;
        }
      } */

      this.loaderState = true;


    })
  }


  startSmartCarSession(code) {
    this.authService.smartCarSession(code).pipe(tap((res: any) => {
      if (res.status === 200) {
        this.getResourcesArray();
        this.getResourcesFast();

      }
    })).subscribe(res => console.log(res),

      error => {
        if (error.status === 500) {
          /*  localStorage.removeItem('token');
            this.router.navigate(['/login'])*/
          this.getResourcesArray();
          this.getResourcesFast();
        }
      });
  }

  getResourcesArray() {
    this.authService.getResources().pipe(catchError(err => {
      this.loaderState = true;
      return throwError(err);
    })).subscribe((res: any) => {
      this.loaderState = true;
      this.dataIsReady = true;

      this.resourcesData = res;
      console.log(this.resourcesData)
    });

  }

  resourceDelete(index) {
    this.resourcesData.splice(index, 1)
  }

  navigateByResource(idResource, smResource) {

    this.router.navigate([`/resource/${idResource}`],)
  }
}
