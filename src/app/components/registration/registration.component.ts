import { Component, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

import { MySnackbarService } from 'src/app/services/snackbar.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { LoginRequest } from 'src/app/data/LoginRequest';

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
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnDestroy {
  constructor(
    private _registrationService: RegistrationService,
    private _snackBar: MySnackbarService,
    private _router: Router
  ) {}

  private subscriptions$ = [];

  myGroup = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPass: new FormControl('', [Validators.required]),
  });

  matcher = new MyErrorStateMatcher();

  onSubmit() {
    const body: LoginRequest = {
      login: this.myGroup.controls['login'].value,
      password: this.myGroup.controls['password'].value,
    };
    const request$ = this._registrationService
      .singUp(body)
      .pipe(
        tap((res: any) => {
          if (res.status === 201) {
            localStorage.setItem('token', res.token); // TODO tpken ???? We don't habe token here
            this._snackBar.openSuccessSnackBar(
              'Thanks for your registration',
              'close'
            );
            this._router.navigate(['/login']);
          } // TODO need to change flow
        }),
        catchError(({ error }: HttpErrorResponse) => {
          this._snackBar.openErrorSnackBar(error.message, 'close');
          return of(error.message);
        })
      )
      .subscribe();
    this.subscriptions$.push(request$);
  }

  singupByGoogle() {
    const requestGoogle$ = this._registrationService
      .googleLogin()
      .pipe()
      .subscribe();
    this.subscriptions$.push(requestGoogle$);
  }

  checkPasswords() {
    return (
      this.myGroup.controls['confirmPass'].value !==
      this.myGroup.controls['password'].value
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((s$) => {
      s$.unsubscribe();
    });
  }
}
