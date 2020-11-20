import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { request } from '../../constants/api';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscriptions$ = [];
  googleLogin = `${request.apiUrl}googleLogin`;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  myGroup = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  matcher = new MyErrorStateMatcher();

  onSubmit() {
    const body = {
      login: this.myGroup.controls['login'].value,
      password: this.myGroup.controls['password'].value,
    };
    const request$ = this.authService
      .authenticate(body)
      .pipe(
        tap((res: {status: number, body: any}) => {
          if (res.status === 200) {
            localStorage.removeItem('token');
            localStorage.setItem('token', res.body.token);
            this.authService.auth_token = res.body.token;
            this.router.navigate(['/resources']);
          }
        }),
        catchError((err: any) => {
          console.log(err);
          return of('no more requests!!!')})
      
      ).subscribe();
      this.subscriptions$.push(request$);

  }
  ngOnDestroy(): void {
    this.subscriptions$.forEach((s$) => {
      s$.unsubscribe();
    });
  }
}
