import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { PoliciesService } from '../../services/policies.service';
import { POLICIES } from '../../constants/policies';
import { request } from '../../constants/api';
import { TYPES } from 'src/app/constants/authTypes';
import { RegistrationService } from 'src/app/services/registration.service';
import { ResourcesService } from 'src/app/services/resources.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent implements OnInit {
  constructor(
    private _resourcesService: ResourcesService,
    private _registrationService: RegistrationService,
    private _activatedRoute: ActivatedRoute,
    private authService: AuthService,

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


    this._activatedRoute.queryParams.subscribe((params) => {
      this.smartCarToken = params['code'];
      const type = params['type'];

      switch (type) {
        case TYPES.GOOGLE:
          this.getGoogleAuthenticate(this.smartCarToken);
          break;
        case TYPES.SMART_CAR:
          localStorage.setItem('smartCarToken', this.smartCarToken);
          if (this.smartCarToken) {
            this.startSmartCarSession(this.smartCarToken);
            this.loaderState = true;
          }
          break;
        default:
          this.policiesService.getPoliciesList();
          this.getResourcesFast();
          this.checkSmartCarToken();
          break;
      }
    });
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

  getGoogleAuthenticate(code: string) {
    this._registrationService.googleAuthenticate(code).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.body.token);
        this.readAllResources();
      },
      (error) => {
        if (error.status === 500) {
          this.readAllResources();
        }
      }
    );
  }

  startSmartCarSession(code: string) {
    this.authService
      .smartCarSession(code)
      .pipe(
        tap((res: any) => {
          if (res.status === 200) {
           this.readAllResources();
          }
        })
      )
      .subscribe(
        (res) => console.log(res),

        (error) => {
          if (error.status === 500) {
           this.readAllResources();
          }
        }
      );
  }

  getResourcesArray() {
    this._resourcesService
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
      });
  }

  getResourcesFast() {
    this._resourcesService.getResourcesFast().subscribe((res: any) => {
      if (res.length && !this.dataIsReady) {
        this.resourcesData = res;
      }
      this.loaderState = true;
    });
  }

  resourceDelete(index: number) {
    this.resourcesData.splice(index, 1);
  }

  readAllResources() {
    this.policiesService.getPoliciesList();
    this.getResourcesArray();
    this.getResourcesFast();
    
  }

  getCorrectPolicy(id: number) {
    return this.policiesService.policies.find(item => item.idPolicy === id)?.name;
  }
}
