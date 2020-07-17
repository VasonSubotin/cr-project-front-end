import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {POLICIES} from "../../constants/policies";
import {filter, tap} from "rxjs/operators";


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

  mockedData = [];

  ngOnInit(): void {
 /*   const code = localStorage.getItem('smartCarToken');
    if (code) {
      this.startSmartCarSession(code)
    }*/
    this.activatedRoute.queryParams.subscribe(params => {
      const code = params['code'];
      localStorage.setItem('smartCarToken', code);
      this.startSmartCarSession(code)
    });
  }

  startSmartCarSession(code) {
    this.authService.smartCarSession(code).pipe(tap((res: any) => {
      if (res.status === 200) {
        this.getResourcesArray();
      }
    })).subscribe();
    this.getResourcesArray();
  }

  getResourcesArray() {
    this.authService.getResources().subscribe((res: any) => {
      this.mockedData = res;
    });

  }

  navigateByResource(idResource) {
    this.router.navigate([`/resource/${idResource}`])
  }
}
