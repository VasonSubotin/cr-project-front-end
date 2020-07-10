import {Component, OnDestroy, OnInit} from '@angular/core';
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

export class LoginComponent implements OnInit, OnDestroy {
  private subscriptions$ = [];

  constructor(private authService: AuthService,
              private router: Router
  ) {}

  ngOnInit(): void {
  }

  myGroup = new FormGroup({
    login: new FormControl('', [
      Validators.required]),
    password: new FormControl('', [
      Validators.required,
    ])
  });


  matcher = new MyErrorStateMatcher();


  onSubmit() {
    const body = {
      login: this.myGroup.controls['login'].value,
      password: this.myGroup.controls['password'].value,
    }
    const request$ = this.authService.authenticate(body).pipe(tap((res: any) => {
      if (res.status === 200) {
        localStorage.setItem('token', res.body.token);
        this.authService.auth_token =  res.body.token;
        this.router.navigate(['/enrollment'])
      };
    })).subscribe();
    this.subscriptions$.push(request$)
  }
  ngOnDestroy(): void {
    this.subscriptions$.forEach(s$ => {
      s$.unsubscribe();
    });
  }

}
