import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';
import { AuthenticationService } from '../../../Auth/services/authentication.service';

@Injectable()
export class RoomsService {
  public id;
  public jwt;
  public decodedJwt;
  public token;
  public jwtHelper: JwtHelper = new JwtHelper();
  headers: any;
  options: any;

  //private apiUrlRoom = "http://5914085a08cca6001102777a.mockapi.io/ROOM/";
  private apiUrlRoom_all = "https://hcmutefslio.herokuapp.com/api/v1/rooms/";
  private apiUrlRoom = "https://hcmutefslio.herokuapp.com/api/v1/room/";
  //private apiUrlRoomType = "http://5914085a08cca6001102777a.mockapi.io/RoomType/";
  private apiUrlRoomType_all = "https://hcmutefslio.herokuapp.com/api/v1/roomtypes/";
  private apiUrlRoomType = "https://hcmutefslio.herokuapp.com/api/v1/roomtype/";
  private apiUrlHouse = "https://hcmutefslio.herokuapp.com/api/v1/houses";

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

  AddNewRoom(data: any): Observable<any> {
    console.log(data);
    return this._http.post(this.apiUrlRoom, data, this.options).map((response) => response.json().results);
  }

  GetListRoomType(): Observable<any[]> {
    return this._http.get(this.apiUrlRoomType_all, this.options).map((response) => response.json().results.doc)
  }

  GetListRoom(id: object): Observable<any[]> {
    return this._http.get(this.apiUrlRoom_all + id, this.options).map((response) => response.json().results)
  }

  UpdateValueRoomType(id: object, data: any): Observable<any> {
    return this._http.put(this.apiUrlRoomType + id, data, this.options).map((response) => response.json().results)
  }

  GetSingleRoomType(id: object): Observable<any> {
    console.log(id);
    return this._http.get(this.apiUrlRoomType + id, this.options).map((response) => response.json().result)
  }

  GetListHouse(): Observable<any[]> {
    return this._http.get(this.apiUrlHouse, this.options).map((response) => response.json().results.doc)
  }

  Delete(id: object): Observable<any> {
    console.log(id);
    return this._http.delete(this.apiUrlRoom + id, this.options).map((response) => response.json().results)
  }

  GetSingleRoom(id: object): Observable<any> {
    return this._http.get(this.apiUrlRoom + id, this.options).map((response) => response.json().results)
  }
}
