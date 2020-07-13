import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {tap} from 'rxjs/operators';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})


export class RegistrationComponent implements OnDestroy {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  private subscriptions$ = [];

  myGroup = new FormGroup({
    login: new FormControl('', [
      Validators.required]),
    password: new FormControl('', [
      Validators.required,
    ]),
    confirmPass: new FormControl('', [
      Validators.required,
    ])
  });


  matcher = new MyErrorStateMatcher();


  onSubmit() {
    const body = {
      login: this.myGroup.controls['login'].value,
      password: this.myGroup.controls['password'].value,
    };
    const request$ = this.authService.singUp(body).pipe(tap((res: any) => {
      if (res.status === 201) this.router.navigate(['/login']);
    })).subscribe();
    this.subscriptions$.push(request$)
  }

  singupByGoogle() {
    const requestGoogle$ = this.authService.googleLogin().pipe(tap((res: any) => {
    })).subscribe();
    this.subscriptions$.push(requestGoogle$)

  }

  checkPasswords() {
    return this.myGroup.controls['confirmPass'].value !== this.myGroup.controls['password'].value
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(s$ => {
      s$.unsubscribe();
    });
  }
}
