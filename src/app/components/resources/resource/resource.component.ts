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
  favoritePolice: string;
  useCalendarFlag: boolean;
  favoritePolices: string[] = ['Minimize CO2 emission', 'Minimize costs', 'Monetary savings', 'Charge car as fast as possible'];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(res => {
      this.idResource = +res.get('idResource');
      this.authService.getResourceById(this.idResource).subscribe(res => {
        this.resource = res;
      })
    });
  }

  openSchedule() {
    this.router.navigate([`/resource/schedule/${this.idResource}`],)
  }
}
