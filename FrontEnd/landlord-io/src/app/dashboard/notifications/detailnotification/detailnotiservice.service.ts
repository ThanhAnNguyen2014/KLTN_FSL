import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { JwtHelper } from "angular2-jwt/angular2-jwt";
import { Observable } from "rxjs/Observable";

@Injectable()
export class DetailnotiserviceService {
  url = 'https://hcmutefslio.herokuapp.com/api/v1/notify/detail/';
  constructor(private http: Http) { }

  findDetailNotiById(id): Observable<any> {
    return this.http.get(this.url + id).map(res => res.json().results);
  }

  acceptRentRoom(id): Observable<any> {
    return this.http.get(this.url + 'accept/' + id).map(res => res.json().results);
  }
  notAcceptRentRoom(id): Observable<any> {
    return this.http.get(this.url + 'notaccept/' + id).map(res => res.json().results);
  }

}
