import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { House, ServicePrice } from './detailhouse'

@Injectable()
export class DetailhouseService {
  private apiUrl = "https://hcmutefslio.herokuapp.com/api/v1/home/house/";
  house: House;
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

}
