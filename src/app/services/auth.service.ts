import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {request} from "../constants/api";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient,
              ) {
  }
  public apiConstants = request;
  public auth_token ;


  singUp(body) {
    return this.http.post(`${this.apiConstants.apiUrl}${this.apiConstants.signup}`, body,  {observe: 'response'})
  }
  authenticate(body) {
    return this.http.post(`${this.apiConstants.apiUrl}${this.apiConstants.authenticate}`, body,  {observe: 'response'})
  }
  googleLogin() {
    return this.http.get(`${this.apiConstants.apiUrl}${this.apiConstants.signupGoogle}`)
  }
 getResources() {

 const _options = { headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${localStorage.getItem('token')}`
     }) };
 debugger

   return this.http.get(`${this.apiConstants.apiUrl}${this.apiConstants.resources}`, _options);

 }

}
