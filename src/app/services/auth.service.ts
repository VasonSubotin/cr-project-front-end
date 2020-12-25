import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {request} from "../constants/api";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  public apiConstants = request;

  needInitSmartCarSession() {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      })
    };


    return this.http.post(`${this.apiConstants.apiUrl}${this.apiConstants.needInitSmartCarSession}`,{}, _options)
  }

  smartCarSession(code: string) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
    return this.http.post(`${this.apiConstants.apiUrl}${this.apiConstants.smartCarSession}?code=${code}`,
      {},
      {headers, observe: 'response'})
  }

 

  deleteResourcesById(idResource) {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.delete(`${this.apiConstants.apiUrl}${this.apiConstants.resources}/${idResource}`, _options);
  }

  getResourceSmartById(idResource) {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'observe': 'response',

      })
    };
    //return this.http.get(`${this.apiConstants.apiUrl}${this.apiConstants.resources}/resources`, _options);
    return this.http.get(`${this.apiConstants.apiUrl}${this.apiConstants.resources}/${idResource}/stateInfo`, _options);
  }

  getResourceDataById(idResource) {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`${this.apiConstants.apiUrl}${this.apiConstants.resources}/${idResource}/resourceInfo`, _options);
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

  getScheduleById(idResource, type) {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'observe': 'response',

      })
    };
    return this.http.get(`${this.apiConstants.apiUrl}${this.apiConstants.resources}/${idResource}/schedule?type=${type}`, headers);
  }
  putScheduleById(idResource, schedule) {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'observe': 'response',

      })
    };
    return this.http.put(`${this.apiConstants.apiUrl}${this.apiConstants.resources}/${idResource}/schedule`, schedule, headers);
  }

  getDrivingScheduleById(idResource) {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,

      })
    };
    return this.http.get(`${this.apiConstants.apiUrl}resources/${idResource}/drivingSchedule`, _options);
  }

  calculateGeo(idResource) {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      })
    };
    return this.http.get(`${this.apiConstants.apiUrl}${this.apiConstants.resources}/${idResource}/calculateGeo`, _options);

  }

  calculateCharing(idResource) {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'observe': 'response',

      })
    };
    return this.http.get(`${this.apiConstants.apiUrl}${this.apiConstants.resources}/${idResource}/chargingSchedule`, _options);

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

  postTimeOfUse(idResource, periodFrom, periodTo, active) {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    const body = {
      resourceId: idResource,
      start: periodFrom,
      stop: periodTo,
      active
    };
    return this.http.post(`${this.apiConstants.apiUrl}tous`, body, _options);
  }

  putTimeOfUse(idResource, periodFrom, periodTo, active) {
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    const body = {
      start: periodFrom,
      stop: periodTo,
      active
    };
    return this.http.put(`${this.apiConstants.apiUrl}${this.apiConstants.resources}/${idResource}/tou`, body, _options);
  }

  getJwtToken(){
    const _options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
   /* const body = {
      start: periodFrom,
      stop: periodTo
    };*/
    return this.http.post(`${this.apiConstants.apiUrl}getJwtToken`,{}, _options);

  }

  
}
