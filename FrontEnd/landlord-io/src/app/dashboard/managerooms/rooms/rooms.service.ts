import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RoomsService {

  private apiUrl = "http://5914085a08cca6001102777a.mockapi.io/ROOM/";
  private apiUrlRoomType = "http://5914085a08cca6001102777a.mockapi.io/RoomType/";

  constructor(
    private _http: Http
  ) { }

  Add(data: any): Observable<any> {
    return this._http.post(this.apiUrl, data).map((response) => response.json());
  }

  GetListRoomType(): Observable<any[]> {
    return this._http.get(this.apiUrlRoomType).map((response) => response.json())
  }

  GetListRoom(): Observable<any[]> {
    return this._http.get(this.apiUrl).map((response) => response.json())
  }

  UpdateValueRoomType(id: object, data: any): Observable<any> {
    return this._http.put(this.apiUrlRoomType + id, data).map((response) => response.json())
  }

   GetSingleRoomType(id: object): Observable<any> {
    return this._http.get(this.apiUrlRoomType + id).map((response) => response.json())
  }
}
