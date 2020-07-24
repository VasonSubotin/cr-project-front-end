import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";


@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html'
})


export class ResourceComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {

  }

  resource;
  idResource: number;
  favoritePolice;
  useCalendarFlag: boolean;
  policyId = 1;
  favoritePolices = [
    {name: 'Minimize CO2 emission', active: false},
    {name: 'Minimize costs', active: false},
    {name: 'Monetary savings', active: false},
    {name: 'Charge car as fast as possible', active: false}];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(res => {
      this.idResource = +res.get('idResource');
      this.authService.getResourceById(this.idResource).subscribe((res: any) => {
        this.resource = res;
        this.favoritePolices[res.policyId - 1].active = true
      })
      this.authService.acccInfo(this.idResource).subscribe((res: any) => {

      })
    });
  }

  openSchedule() {
    this.router.navigate([`/resource/schedule/${this.idResource}`])
  }

  updateResource(policyId) {
    this.resource.policyId = policyId;
    this.resource.idResource = this.idResource;
    const body = this.resource;
    this.authService.updateResourceById(this.idResource, body).subscribe((res: any) => {
      this.resource = res;
    })
  }


  changePolicy(policyId) {
    this.updateResource(policyId);
  }
}
