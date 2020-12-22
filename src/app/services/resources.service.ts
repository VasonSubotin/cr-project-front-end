import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { request } from '../constants/api';

@Injectable()
export class ResourcesService {
  constructor(private http: HttpClient) {}

  getResources() {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`${request.apiUrl}${request.resources}/stateInfo`, _options);
  }


  getResourcesFast() {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`${request.apiUrl}${request.resources}`, _options);
  }

}


