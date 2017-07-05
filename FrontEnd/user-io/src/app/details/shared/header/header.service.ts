import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AuthenticationService } from '../../../Auth/services/authentication.service';
import { JwtHelper } from 'angular2-jwt';
@Injectable()
export class HeaderService {
  public id;
  public jwt;
  public decodedJwt;
  public token;
  public jwtHelper: JwtHelper = new JwtHelper();
  public url = 'http://hcmutefslio.herokuapp.com/';
  constructor(private http: Http, private authenticationService: AuthenticationService) {
    this.jwt = JSON.parse(localStorage.getItem('currentUser'));
    if (this.jwt) {
      this.decodedJwt = this.jwtHelper.decodeToken(this.jwt.token);
      this.id = this.decodedJwt.id;
      this.token = this.jwt.token;
    }
  }
  getInfo(): Observable<any> {
    if (this.token) {
      // add authorization header with jwt token
      let headers = new Headers({
        'Authorization': this.token,
        'Accept': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      // get users from api
      return this.http.get(this.url + 'api/v1/user/' + this.id, options).map((res) => res.json().results);
    }

  }
}
