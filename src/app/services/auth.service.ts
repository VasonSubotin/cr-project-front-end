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

  public googleAuthenticate(code) {
    return this.http.post(`${this.apiConstants.apiUrl}googleAuthenticate?code=${code}`, {})
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
    //return this.http.get(`${this.apiConstants.apiUrl}${this.apiConstants.resources}/resources`, _options);
    return this.http.get(`${this.apiConstants.apiUrl}${this.apiConstants.resources}/stateInfo`, _options);
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
    return this.http.put(`${this.apiConstants.apiUrl}${this.apiConstants.resources}/${idResource}`, body, _options);
  }

  getScheduleById(idResource) {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`${this.apiConstants.apiUrl}${this.apiConstants.resources}/${idResource}/schedule`, _options);
  }

  getDrivingScheduleById(idResource) {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`${this.apiConstants.apiUrl}${this.apiConstants.resources}/${idResource}/drivingSchedule`, _options);
  }

  calculateGeo(idResource) {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`${this.apiConstants.apiUrl}${this.apiConstants.resources}/${idResource}/calculateGeo`, _options);

  }

  calculateCharing(idResource) {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`${this.apiConstants.apiUrl}${this.apiConstants.resources}/${idResource}/chargingSchedule`, _options);

  }


  getHistory(idResource) {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`

      })
    };
    return this.http.get(`${this.apiConstants.apiUrl}${this.apiConstants.resources}/${idResource}/scheduleHistory`, _options);
  }

  timeOfUse(idResource) {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`${this.apiConstants.apiUrl}${this.apiConstants.resources}/${idResource}/tou`, _options);
  }

  postTimeOfUse(idResource, periodFrom, periodTo) {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    const body = {
      resourceId: idResource,
      start: periodFrom,
      stop: periodTo
    };
    return this.http.post(`${this.apiConstants.apiUrl}tous`, body, _options);
  }

  putTimeOfUse(idResource, periodFrom, periodTo) {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    const body = {
      start: periodFrom,
      stop: periodTo
    };
    return this.http.put(`${this.apiConstants.apiUrl}${this.apiConstants.resources}/${idResource}/tou`, body, _options);
  }

}
