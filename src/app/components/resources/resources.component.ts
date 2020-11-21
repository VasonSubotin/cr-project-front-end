import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { PoliciesService } from '../../services/policies.service';
import { POLICIES } from '../../constants/policies';
import { request } from '../../constants/api';
import { EditResourcePopupComponent } from '../../reusable-components/popups/edit-resource-popup/edit-resource-popup.component';


@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
    public policiesService: PoliciesService
  ) {}

  policies: POLICIES;
  dataIsReady = false;
  loaderState = false;
  resourcesData = [];
  searchText: string;
  smartCarToken: string;
  smartCarLogin: string = `${request.apiUrl}smartCarLogin`;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.smartCarToken = params['code'];
      const type = params['type'];
      enum TYPES {
        GOOGLE = 'google',
        SMART_CAR = 'smartCar',
      }
      switch (type) {
        case TYPES.GOOGLE:
          this.getGoogleAuthenticate(params['code']);
          break;
        case TYPES.SMART_CAR:
          localStorage.setItem('smartCarToken', this.smartCarToken);
          if (localStorage.getItem('smartCarToken')) {
            this.startSmartCarSession(localStorage.getItem('smartCarToken'));
            this.loaderState = true;
          }
          break;
        default:
          this.getResourcesFast();
          break;
      }
    });

    this.policiesService.getPoliciesList();
  }

  checkSmartCarToken() {
    this.authService
      .needInitSmartCarSession()
      .pipe(
        catchError((error) => {
          this.loaderState = true;
          this.getResourcesArray();
          return error;
        })
      )
      .subscribe((res: any) => {
        if (res.needInit) {
          this.loaderState = true;
        } else {
          this.getResourcesArray();
        }
      });
  }

  testEdit() {
    const dialogConf: any = {
      data: {},
      panelClass: 'edit-resource-dialog',
      closeOnNavigation: true,
      autoFocus: false,
    };
    const dialogRef = this.matDialog.open(
      EditResourcePopupComponent,
      dialogConf
    );
    dialogRef.afterClosed().subscribe((unixEvent) => {
      if (unixEvent) {
      }
    });
  }

  getGoogleAuthenticate(code) {
    this.authService.googleAuthenticate(code).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.body.token);
        this.getResourcesFast();
      },
      (error) => {
        if (error.status === 500) {
          this.getResourcesFast();
        }
      }
    );
  }

  getResourcesFast() {
    let resourcesArray = [];
    this.authService.getResourcesFast().subscribe((res: any) => {
      if (res.length) {
        res.map((item, index) => {
          resourcesArray[index] = {};
          resourcesArray[index].smResource = item;

          this.checkSmartCarToken();
        });
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
    });
  }

  startSmartCarSession(code) {
    this.authService
      .smartCarSession(code)
      .pipe(
        tap((res: any) => {
          if (res.status === 200) {
            this.getResourcesFast();
            this.getResourcesArray();
          }
        })
      )
      .subscribe(
        (res) => console.log(res),

        (error) => {
          if (error.status === 500) {
            /*  localStorage.removeItem('token');
            this.router.navigate(['/login'])*/
            this.getResourcesArray();
            this.getResourcesFast();
          }
        }
      );
  }

  getResourcesArray() {
    this.authService
      .getResources()
      .pipe(
        catchError((err) => {
          this.loaderState = true;
          return throwError(err);
        })
      )
      .subscribe((res: any) => {
        this.loaderState = true;
        this.dataIsReady = true;

        this.resourcesData = res;
        console.log(this.resourcesData);
      });
  }

  resourceDelete(index) { // todo
    console.log(index);
    this.resourcesData.splice(index, 1);
  }

  navigateByResource(idResource) { // todo
    this.router.navigate([`/resource/${idResource}`]);
  }
}
