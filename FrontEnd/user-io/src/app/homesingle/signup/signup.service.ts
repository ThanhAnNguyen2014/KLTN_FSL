import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";


@Injectable()
export class SignupService {
  public url = 'https://hcmutefslio.herokuapp.com';
  constructor(private http: Http) { }

  validateRegister(user) {
    if (
      user.firstname == undefined ||
      user.lastname == undefined ||
      user.email == undefined ||
      user.phone == undefined ||
      user.password == undefined ||
      user.passwordconfirm == undefined) {
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
  validateUser(user): Observable<any> {
    return this.http.post(this.url + '/api/v1/user/check/validate', user).map(res => res.json());
  }

  registerUser(user): Observable<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + '/api/v1/user/register', user, options).map(res => res.json());
  }

}
