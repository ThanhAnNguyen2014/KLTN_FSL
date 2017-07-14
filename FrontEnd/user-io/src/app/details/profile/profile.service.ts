import { Injectable, Component } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AuthenticationService } from '../../Auth/services/authentication.service';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class ProfileService {
  public id;
  public jwt;
  public decodedJwt;
  public token;
  public jwtHelper: JwtHelper = new JwtHelper();
  public url = 'http://hcmutefslio.herokuapp.com/';
  constructor(private http: Http, private authenticationService: AuthenticationService) {
    this.jwt = JSON.parse(localStorage.getItem('currentUser'));
    this.decodedJwt = this.jwtHelper.decodeToken(this.jwt.token);
    this.id = this.decodedJwt.id;
    this.token = this.jwt.token;
  }

  getUsers(): Observable<any> {
    // add authorization header with jwt token
    let headers = new Headers({
      'Authorization': this.token,
      'Accept': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    // get users from api
    return this.http.get(this.url + 'api/v1/user/' + this.id, options).map((res) => res.json().results);
  }
  updateUsers(content): Observable<any> {
    // add authorization header with jwt token
    let headers = new Headers({
      'Authorization': this.token,
      'Accept': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.url + 'api/v1/user/' + this.id, content, options).map((res) => res.json().results)
  }
}
