import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {tap, map} from 'rxjs/operators';


@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html'
})


export class EnrollmentComponent implements  OnInit{
  constructor(private authService: AuthService,
              private router: Router) {
  }
ngOnInit(): void {
  this.authService.getResources().subscribe(res => console.log(res))

}
}
