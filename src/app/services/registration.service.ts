import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { request } from '../constants/api';
import { LoginRequest } from '../data/LoginRequest';
import { catchError } from 'rxjs/internal/operators/catchError';


@Injectable()
export class RegistrationService {
  constructor(private http: HttpClient, private router: Router) {}

  singUp(body: LoginRequest) {
    return this.http.post(`${request.apiUrl}${request.signup}`, body, {
      observe: 'response',
    });
  }

  authenticate(body: LoginRequest) {
    return this.http.post(`${request.apiUrl}${request.authenticate}`, body, {
      observe: 'response',
    });
  }

  googleLogin() {
    return this.http.get(`${request.apiUrl}${request.signupGoogle}`);
  }

  authrized(code: string) {
    return this.http.get(`${request.apiUrl}${request.authrized}?code=${code}`);
  }

  googleAuthenticate(code: string) {
    return this.http.post(
      `${request.apiUrl}googleAuthenticate?code=${code}`,
      {},
      { observe: 'response' }
    );
  }

  accountInfo() {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`${request.apiUrl}accountInfo`, _options).pipe(
      catchError(err => {
        this.router.navigate(['/login'])
        return of(err);
      }))
      
  }

  checkAccount() {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`${request.apiUrl}needInitGoogleSession`, _options)
      
  }
}
