import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { JwtHelper } from "angular2-jwt/angular2-jwt";
import { Observable } from "rxjs/Observable";
@Injectable()
export class HomeService {

  public jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http) { }
  
  getTenNotifyNewConstructor(): Observable<any>{
    var jwt = JSON.parse(localStorage.getItem('currentUser'));
    var id = this.jwtHelper.decodeToken(jwt.token).id;
    return this.http.get('http://localhost:3300/api/v1/notify/new/' + id).map(res=>res.json().results.doc);
  }

}
