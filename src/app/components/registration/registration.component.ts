import {Component} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {tap, map} from 'rxjs/operators';


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


export class RegistrationComponent {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  myGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email]),
    password: new FormControl('', [
      Validators.required,
    ]),
    login: new FormControl('', [
      Validators.required,
    ])
  });


  matcher = new MyErrorStateMatcher();


  onSubmit() {
    const body = {
      email: this.myGroup.controls['email'].value,
      password: this.myGroup.controls['password'].value,
    }
    this.authService.singUp(body).pipe(tap((res: any) => {
      if (res.status === 201) this.router.navigate(['/login']);
    })).subscribe().unsubscribe();

  }

}
