import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RoomsService {

  //private apiUrlRoom = "http://5914085a08cca6001102777a.mockapi.io/ROOM/";
  private apiUrlRoom_all = "https://hcmutefslio.herokuapp.com/api/v1/rooms";
  private apiUrlRoom = "https://hcmutefslio.herokuapp.com/api/v1/room/";
  //private apiUrlRoomType = "http://5914085a08cca6001102777a.mockapi.io/RoomType/";
  private apiUrlRoomType_all = "https://hcmutefslio.herokuapp.com/api/v1/roomtypes/";
  private apiUrlRoomType = "https://hcmutefslio.herokuapp.com/api/v1/roomtype/";
  private apiUrlHouse_all = "https://hcmutefslio.herokuapp.com/api/v1/houses/all";

  constructor(
    private _http: Http
  ) { }

  AddNewRoom(data: any): Observable<any> {
    console.log(data);
    return this._http.post(this.apiUrlRoom, data).map((response) => response.json().results);
  }

  GetListRoomType(): Observable<any[]> {
    return this._http.get(this.apiUrlRoomType_all).map((response) => response.json().results)
  }

  GetListRoom(): Observable<any[]> {
    return this._http.get(this.apiUrlRoom_all).map((response) => response.json().results)
  }

  UpdateValueRoomType(id: object, data: any): Observable<any> {
    return this._http.put(this.apiUrlRoomType + id, data).map((response) => response.json().results)
  }

  GetSingleRoomType(id: object): Observable<any> {
    console.log(id);
    return this._http.get(this.apiUrlRoomType + id).map((response) => response.json().result)
  }

  GetListHouse(): Observable<any[]> {
    return this._http.get(this.apiUrlHouse_all).map((response) => response.json().results)
  }

  Delete(id: object): Observable<any> {
    console.log(id);
    return this._http.delete(this.apiUrlRoom + id).map((response) => response.json().results)
  }

  GetSingleRoom(id: object): Observable<any> {
    return this._http.get(this.apiUrlRoom + id).map((response) => response.json().results)
  }
}
