import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {POLICIES} from "../../constants/policies";
import {tap} from "rxjs/operators";


@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html'
})


export class ResourcesComponent implements OnInit {
  constructor(private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  policies: POLICIES;

  mockedData = [
    {
    "idResource": 567890,
    "accountId": 6067786,
    "externalResourceId": "dronew-1-df5-6",
    "vendor": "SF Chen",
    "model": "MychukiTest",
    "policyId": 0,
    "resourceTypeId": 2,
    "groupId": "TeslaG1",
    "power": 25,
    "capacity": 60,
    "dtUpdated": "2020-06-20T18:10:000-07:00",
    "dtCreated": "2020-06-15T18:10:000-07:00",
    "deleted": null
  },
    {
      "idResource": 567890,
      "accountId": 6067786,
      "externalResourceId": "dronew-1-df5-6",
      "vendor": "SF Chen",
      "model": "MychukiTest",
      "policyId": 0,
      "resourceTypeId": 2,
      "groupId": "TeslaG1",
      "power": 25,
      "capacity": 60,
      "dtUpdated": "2020-06-20T18:10:000-07:00",
      "dtCreated": "2020-06-15T18:10:000-07:00",
      "deleted": null
    },
    {
    "idResource": 567890,
    "accountId": 6067786,
    "externalResourceId": "dronew-1-df5-6",
    "vendor": "SF Chen",
    "model": "MychukiTest",
    "policyId": 0,
    "resourceTypeId": 2,
    "groupId": "TeslaG1",
    "power": 25,
    "capacity": 60,
    "dtUpdated": "2020-06-20T18:10:000-07:00",
    "dtCreated": "2020-06-15T18:10:000-07:00",
    "deleted": null
  },
    {
      "idResource": 567890,
      "accountId": 6067786,
      "externalResourceId": "dronew-1-df5-6",
      "vendor": "SF Chen",
      "model": "MychukiTest",
      "policyId": 0,
      "resourceTypeId": 2,
      "groupId": "TeslaG1",
      "power": 25,
      "capacity": 60,
      "dtUpdated": "2020-06-20T18:10:000-07:00",
      "dtCreated": "2020-06-15T18:10:000-07:00",
      "deleted": null
    }
  ];

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const code = params['code'];
      this.authService.smartCarSession(code).pipe(tap((res: any) => {
        if (res.status === 201) {
          this.authService.getResources().subscribe((res: any) => {
            console.log(res)
            /*  this.mockedData = [];*/
            /* this.mockedData = res;*/
          });
        }
      })).subscribe();

    });
  }
  navigateByResource(idResource) {
    this.router.navigate([`/resource/${idResource}`])
  }
}
