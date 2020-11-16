import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable()
export class PoliciesService {
  policies;
  constructor(private authService: AuthService,
  ) {
  }
  getPoliciesList(){
    this.authService.getPoliciesList().subscribe((res) => {
      console.log(res);
      this.policies = res;
    })
  }
}
