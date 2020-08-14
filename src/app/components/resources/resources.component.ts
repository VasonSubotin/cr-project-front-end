import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {POLICIES} from "../../constants/policies";
import {tap} from "rxjs/operators";
import {EditResourcePopupComponent} from "../../reusable-components/popups/edit-resource-popup/edit-resource-popup.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html'
})


export class ResourcesComponent implements OnInit {
  constructor(private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute ,
              private matDialog: MatDialog,) {
  }

  policies: POLICIES;
  dataIsReady = false;
  mockedData = [];

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const code = params['code'];
      const type = params['type'];
      if (type === 'google') {
        localStorage.setItem('token', params['code']);
        window.location.href = 'http://localhost:8080/smartCarLogin';
      } else if (type === 'smartCar') {
        localStorage.setItem('smartCarToken', code);
        this.startSmartCarSession(code)
      }
    });
    if ( localStorage.getItem('smartCarToken')) {
      this.startSmartCarSession(localStorage.getItem('smartCarToken'))
    }
    this.getResourcesArray();
    const dialogConf: any = {
      data: [], panelClass: 'edit-resource-dialog', closeOnNavigation: true, autoFocus: false
    };
    const dialogRef = this.matDialog.open(EditResourcePopupComponent, dialogConf);
    dialogRef.afterClosed().subscribe(
      unixEvent => {
        if (unixEvent) {
        }
      }
    );
  }

  startSmartCarSession(code) {
    this.authService.smartCarSession(code).pipe(tap((res: any) => {
      if (res.status === 200) {

      }
    })).subscribe();

  }

  getResourcesArray() {
    this.authService.getResources().subscribe((res: any) => {
      this.mockedData = res;
      this.dataIsReady = true;
    });

  }

  navigateByResource(idResource) {
    this.router.navigate([`/resource/${idResource}`])
  }
}
