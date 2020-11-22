import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {request} from "../constants/api";

@Injectable()
export class RegistrationService {
  constructor(private http: HttpClient) {}

  public apiConstants = request;

  singUp(body) {
    return this.http.post(`${this.apiConstants.apiUrl}${this.apiConstants.signup}`, body, {observe: 'response'})
  }

  authenticate(body) {
    return this.http.post(`${this.apiConstants.apiUrl}${this.apiConstants.authenticate}`, body, {observe: 'response'})
  }

  googleLogin() {
    return this.http.get(`${this.apiConstants.apiUrl}${this.apiConstants.signupGoogle}`)
  }

  authrized(code: string) {
    return this.http.get(`${this.apiConstants.apiUrl}${this.apiConstants.authrized}?code=${code}`)
  }

  googleAuthenticate(code: string) {
    return this.http.post(`${this.apiConstants.apiUrl}googleAuthenticate?code=${code}`, {}, {observe: 'response'})
  }
}