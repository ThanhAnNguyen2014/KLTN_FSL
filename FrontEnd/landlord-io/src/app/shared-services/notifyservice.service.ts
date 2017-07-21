import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { JwtHelper } from "angular2-jwt/angular2-jwt";
import 'rxjs/add/operator/map';

@Injectable()
export class NotifyserviceService {
  public jwtHelper: JwtHelper = new JwtHelper();
  constructor(private http: Http) { }

  getTenNotifyNew() {
    var jwt = JSON.parse(localStorage.getItem('currentUser'));
    var id = this.jwtHelper.decodeToken(jwt.token).id;
    return new Promise((resovle, reject) => {
      this.http.get('http://localhost:3300/api/v1/notify/new/' + id)
        .map(res => res.json().results.doc)
        .subscribe(res => {
          resovle(res);
        }, err => {
          reject(err);
        });
    });
  }
}
