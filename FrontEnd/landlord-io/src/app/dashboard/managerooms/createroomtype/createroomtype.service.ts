import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';
import { AuthenticationService } from '../../../Auth/services/authentication.service';

@Injectable()
export class CreateroomtypeService {
  public id;
  public jwt;
  public decodedJwt;
  public token;
  public jwtHelper: JwtHelper = new JwtHelper();
  headers: any;
  options: any;

  private apiUrl_all = "https://hcmutefslio.herokuapp.com/api/v1/roomtypes";
  //private apiUrl = "http://5914085a08cca6001102777a.mockapi.io/RoomType/";
  private apiUrl = "https://hcmutefslio.herokuapp.com/api/v1/roomtype/";
  //private apiUrlDevice = "http://5914085a08cca6001102777a.mockapi.io/Device/";
  private apiUrlDevice = "https://hcmutefslio.herokuapp.com/api/v1/devices/";
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

  Add(data: any): Observable<any> {
    return this._http.post(this.apiUrl, data, this.options).map((response) => response.json().results.doc);
  }

  GetList(): Observable<any[]> {
    return this._http.get(this.apiUrl_all, this.options).map((response) => response.json().results.doc)
  }

  Delete(id: object): Observable<any> {
    return this._http.delete(this.apiUrl + id, this.options).map((response) => response.json().results.doc)
  }

  GetSingle(id: object): Observable<any> {
    return this._http.get(this.apiUrl + id, this.options).map((response) => response.json().results.doc)
  }

  Update(id: object, data: any): Observable<any> {
    return this._http.put(this.apiUrl + id, data, this.options).map((response) => response.json().results.doc)
  }

  GetListDevice(): Observable<any[]> {
    return this._http.get(this.apiUrlDevice, this.options).map((response) => response.json().results.doc)
  }
}
