import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class RateHouseService {
  public id;
  public jwt;
  public decodedJwt;
  public token;
  public jwtHelper: JwtHelper = new JwtHelper();
  public url = 'http://hcmutefslio.herokuapp.com/api/v1/house/detail/rating';
  //public url = 'http://localhost:3300/api/v1/house/detail/rating';

  constructor(private http: Http) {
    this.jwt = JSON.parse(localStorage.getItem('currentUser'));
    if (this.jwt) {
      this.token = this.jwt.token;
    }
    
  }
  postRating(body: object): Observable<any> {
    var token= JSON.parse(localStorage.getItem('currentUser')).token;
    let headers = new Headers({
      'Authorization': token,
      'Accept': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, body, options).map((res) => res.json().results);
  }

  getToken(jwt) {
    this.token = jwt;
  }
}
