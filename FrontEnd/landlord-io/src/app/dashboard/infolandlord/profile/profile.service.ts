import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http, Headers, RequestOptions } from "@angular/http";
import { AuthenticationService } from '../../../Auth/services/authentication.service';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class ProfileService {

  public id;
  public jwt;
  public decodedJwt;
  public token;
  public jwtHelper: JwtHelper = new JwtHelper();
  private apiUrl = "https://hcmutefslio.herokuapp.com/api/v1/landlord/";

  headers: any;
  options: any;

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
  /**
   * 
   * get info landlord depend on id_landlord
   */
  GetSingle(): Observable<any> {
    return this._http.get(this.apiUrl + this.id, this.options).map((response) => response.json().results.doc)
  }

  Update(data: any): Observable<any> {
    return this._http.put(this.apiUrl + this.id, data, this.options).map((response) => response.json().results.doc)
  }
}
