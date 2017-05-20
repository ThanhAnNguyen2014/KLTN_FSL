import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CreateroomtypeService {

  private apiUrl = "http://5914085a08cca6001102777a.mockapi.io/RoomType/";
  constructor(
    private _http: Http
  ) { }

  Add(data: any): Observable<any> {
    return this._http.post(this.apiUrl, data).map((response) => response.json());
  }

  GetList(): Observable<any[]> {
    return this._http.get(this.apiUrl).map((response) => response.json())
  }

  Delete(id: object): Observable<any> {
    return this._http.delete(this.apiUrl + id).map((response) => response.json())
  }

  GetSingle(id: object): Observable<any> {
    return this._http.get(this.apiUrl + id).map((response) => response.json())
  }

  Update(id: object, data: any): Observable<any> {
    return this._http.put(this.apiUrl + id, data).map((response) => response.json())
  }
}
