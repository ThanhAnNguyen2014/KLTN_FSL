import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { House, ServicePrice } from './detailhouse'
import { JwtHelper } from "angular2-jwt/angular2-jwt";

@Injectable()
export class DetailhouseService {
  private apiUrl = "https://hcmutefslio.herokuapp.com/api/v1/home/house/";
  house: House;
  public jwtHelper: JwtHelper = new JwtHelper();
  constructor(private http: Http) { }

  /**get house by id */
  getHouseById(id): Observable<House> {
    return this.http.get(this.apiUrl + id).map((res) => res.json().result);
  }
  /**get all room by id house */
  getAllRoomByIdHouse(id): Observable<any> {
    return this.http.get('https://hcmutefslio.herokuapp.com/api/v1/detail/house/rooms/' + id).map((res) =>
      res.json().results
    );
  }
  checkUserRentRoom(): Observable<any> {
    var token = JSON.parse(localStorage.getItem('currentUser')).token;
    let headers = new Headers({
      'Authorization': token,
      'Accept': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('https://hcmutefslio.herokuapp.com/api/v1/check/rentroom', options).map((res) => res.json().results);
  }
  getIdUser() {
    var jwt = JSON.parse(localStorage.getItem('currentUser'));
    var token = jwt.token;
    var username = jwt.username;
    var id_user = this.jwtHelper.decodeToken(token).id;
    return {
      id_user: id_user,
      username: username
    };
  }
  getSixHouse():Observable<any>{
    return this.http.get('https://hcmutefslio.herokuapp.com/api/v1/home/houses').map(res=>res.json().results);
  }
}
