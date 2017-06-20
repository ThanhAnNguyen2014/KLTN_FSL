import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CreateroomtypeService {

  private apiUrl_all = "https://hcmutefslio.herokuapp.com/api/v1/roomtypes";
  //private apiUrl = "http://5914085a08cca6001102777a.mockapi.io/RoomType/";
  private apiUrl = "https://hcmutefslio.herokuapp.com/api/v1/roomtype/";
  //private apiUrlDevice = "http://5914085a08cca6001102777a.mockapi.io/Device/";
  private apiUrlDevice = "https://hcmutefslio.herokuapp.com/api/v1/devices/";
  constructor(
    private _http: Http
  ) { }

  Add(data: any): Observable<any> {
    return this._http.post(this.apiUrl, data).map((response) => response.json().result);
  }

  GetList(): Observable<any[]> {
    return this._http.get(this.apiUrl_all).map((response) => response.json().results)
  }

  Delete(id: object): Observable<any> {
    return this._http.delete(this.apiUrl + id).map((response) => response.json().result)
  }

  GetSingle(id: object): Observable<any> {
    return this._http.get(this.apiUrl + id).map((response) => response.json().result)
  }

  Update(id: object, data: any): Observable<any> {
    return this._http.put(this.apiUrl + id, data).map((response) => response.json().result)
  }

  GetListDevice(): Observable<any[]> {
    return this._http.get(this.apiUrlDevice).map((response) => response.json().results.doc)
  }
}
