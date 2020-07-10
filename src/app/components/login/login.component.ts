import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {tap} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router
  ) {}

  ngOnInit(): void {
  }


  myGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email]),
    password: new FormControl('', [
      Validators.required,
    ])
  });


  matcher = new MyErrorStateMatcher();


  onSubmit() {
    const body = {
      email: this.myGroup.controls['email'].value,
      password: this.myGroup.controls['password'].value,
    }
    this.authService.authenticate(body).pipe(tap((res: any) => {
      if (res.status === 200) this.router.navigate(['/enrollment']);
    })).subscribe().unsubscribe();
  }

  authByGoogle() {
    this.authService.googleLogin().pipe(tap((res: any) => {
      debugger
      if (res.status === 200) this.router.navigate(['/enrollment']);
    })).subscribe().unsubscribe();
  }
}
