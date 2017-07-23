import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';
import { AuthenticationService } from '../../../Auth/services/authentication.service';

@Injectable()
export class DetailroomService {
  public id;
  public jwt;
  public decodedJwt;
  public token;
  public jwtHelper: JwtHelper = new JwtHelper();
  headers: any;
  options: any;

  private apiUrlRoom = "https://hcmutefslio.herokuapp.com/api/v1/room/";
  private apiUrlRoomType_all = "https://hcmutefslio.herokuapp.com/api/v1/roomtypes/";
  private apiUrlHouse_all = "https://hcmutefslio.herokuapp.com/api/v1/houses/all";


  private apiUrl = "https://hcmutefslio.herokuapp.com/api/v1/landlord/";

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

  GetListRoomType(): Observable<any[]> {
    return this._http.get(this.apiUrlRoomType_all, this.options).map((response) => response.json().results)
  }

  GetListHouse(): Observable<any[]> {
    return this._http.get(this.apiUrlHouse_all, this.options).map((response) => response.json().results)
  }

  GetSingleRoom(id: object): Observable<any> {
    return this._http.get(this.apiUrlRoom + id, this.options).map((response) => response.json().results)
  }


  GetSingle(): Observable<any> {
    return this._http.get(this.apiUrl + this.id, this.options).map((response) => response.json().results.doc)
  }
  EditRoom(id, content): Observable<any> {
    return this._http.put(this.apiUrlRoom + id, content, this.options).map(res => res.json().results);
  }
  getDetailRentRoom(id): Observable<any> {
    return this._http.get('https://hcmutefslio.herokuapp.com/api/v1/room/rentroom/' + id, this.options).map(res => res.json().results);
  }
  deletedRentRoomUser(id): Observable<any> {
    return this._http.delete('https://hcmutefslio.herokuapp.com/api/v1/room/rentroom/deleted/' + id, this.options).map(res => res.json().results);
  }

}
