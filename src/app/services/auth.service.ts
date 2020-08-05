import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {request} from "../constants/api";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient,
  ) {
  }

  public apiConstants = request;
  public auth_token;


  singUp(body) {
    return this.http.post(`${this.apiConstants.apiUrl}${this.apiConstants.signup}`, body, {observe: 'response'})
  }

  authenticate(body) {
    return this.http.post(`${this.apiConstants.apiUrl}${this.apiConstants.authenticate}`, body, {observe: 'response'})
  }

  googleLogin() {
    return this.http.get(`${this.apiConstants.apiUrl}${this.apiConstants.signupGoogle}`)
  }

  smartCarSession(code) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    return this.http.post(`${this.apiConstants.apiUrl}${this.apiConstants.smartCarSession}?code=${code}`,
      {},
      {headers, observe: 'response'})
  }

  getResources() {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`${this.apiConstants.apiUrl}${this.apiConstants.resources}`, _options);
  }

  getResourceById(idResource) {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`${this.apiConstants.apiUrl}${this.apiConstants.resources}/${idResource}/resourceInfo`, _options);
  }
  acccInfo(idResource) {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`${this.apiConstants.apiUrl}accountInfo`, _options);
  }
  updateResourceById(idResource, body) {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.put(`${this.apiConstants.apiUrl}${this.apiConstants.resources}`, body, _options);
  }
  getScheduleById(idResource) {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`${this.apiConstants.apiUrl}${this.apiConstants.resources}/${idResource}/calculate`, _options);
  }

}
