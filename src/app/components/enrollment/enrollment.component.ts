import {Component} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {tap, map} from 'rxjs/operators';


@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html'
})


export class EnrollmentComponent {
  constructor(private authService: AuthService,
              private router: Router) {
  }





  onSubmit() {


  }

}
