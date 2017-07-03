import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AuthenticationService } from '../../../Auth/services/authentication.service';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class ListhouseService {
  public id;
  public jwt;
  public decodedJwt;
  public token;
  public jwtHelper: JwtHelper = new JwtHelper();
  headers: any;
  options: any;

  private apiUrl = "https://hcmutefslio.herokuapp.com/api/v1/houses";

  constructor(
    private _http: Http,
    private authenticationService: AuthenticationService
  ) { 
    this.jwt = JSON.parse(localStorage.getItem('currentUser'));
    this.decodedJwt = this.jwtHelper.decodeToken(this.jwt.token);
    this.id = this.decodedJwt.id;
    this.token = this.jwt.token;
    // add authorization header with jwt token
    this.headers = new Headers({
      'Authorization': this.token,
      'Accept': 'application/json'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }



  GetList(): Observable<any[]> {
    return this._http.get(this.apiUrl, this.options).map((response) => response.json().results.doc)
  }



  Delete(id: object): Observable<any> {
    return this._http.delete("https://hcmutefslio.herokuapp.com/api/v1/house/" + id, this.options).map((res) => res.json().results);
  }

}
