import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class FunctionsService {
  constructor(private http: HttpClient,
  ) {
  }

  formattingTime(time) {
    let hours = '00';
    hours = `${Math.floor(time / 60)}`;
    const minutes = `${time % 60}`;
    let rminutes = '00';
    if (minutes.length < 1) {
      rminutes = minutes + '0'
    } else {
      rminutes = minutes
    }
    if (hours.length < 1) {
      hours = '0' + hours
    }
    return `${hours}:${rminutes}`;
  }
}
