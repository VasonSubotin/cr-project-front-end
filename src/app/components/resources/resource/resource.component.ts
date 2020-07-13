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

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(res => {
      const idResource = res.get('idResource');
      console.log(idResource)
      this.authService.getResourceById(idResource).subscribe(res => {
        console.log(res)
      })
    });
  }
}
