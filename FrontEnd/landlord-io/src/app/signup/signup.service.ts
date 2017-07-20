import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class SignupService {
  public url = 'https://hcmutefslio.herokuapp.com/api/v1/landlord/';

  constructor(
    private http: Http
  ) { }

  validateRegister(landlord) {
    if (
      landlord.firstname == undefined ||
      landlord.lastname == undefined ||
      landlord.phone == undefined ||
      landlord.email == undefined ||
      landlord.password == undefined ||
      landlord.passwordconfirm == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  confirmPassword(password, passwordconfirm) {
    if (password === passwordconfirm)
      return true;
    else
      return false;
  }
  validateLandlord(landlord): Observable<any> {
    return this.http.post(this.url + 'check/validate', landlord).map(res => res.json());
  }

  registerLandlord(landlord): Observable<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + 'register', landlord, options).map(res => res.json());
  }
}
