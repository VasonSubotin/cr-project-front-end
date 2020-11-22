import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { request } from '../constants/api';
import { Policy } from '../data/Policy';

@Injectable()
export class PoliciesService {
  policies: Policy[];
  public apiConstants = request;
  constructor(private http: HttpClient) {}

  readPoliciesList() {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };

    return this.http.get(
      `${this.apiConstants.apiUrl}${this.apiConstants.policiesList}`,
      _options
    );
  }

  getPoliciesList() {
    this.readPoliciesList().subscribe((res: Policy[]) => {
      this.policies = res;
    });
  }
}
