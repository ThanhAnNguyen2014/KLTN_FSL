import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DetailroomService {

  private apiUrlRoom = "https://hcmutefslio.herokuapp.com/api/v1/room/";
  private apiUrlRoomType_all = "https://hcmutefslio.herokuapp.com/api/v1/roomtypes/";
  private apiUrlHouse_all = "https://hcmutefslio.herokuapp.com/api/v1/houses/all";


  private apiUrl = "https://hcmutefslio.herokuapp.com/api/v1/landlord/5919ac4cdfc17f0004e2006c";

  constructor(private _http: Http) { }

  GetListRoomType(): Observable<any[]> {
    return this._http.get(this.apiUrlRoomType_all).map((response) => response.json().results)
  }

  GetListHouse(): Observable<any[]> {
    return this._http.get(this.apiUrlHouse_all).map((response) => response.json().results)
  }

  GetSingleRoom(id: object): Observable<any> {
    return this._http.get(this.apiUrlRoom + id).map((response) => response.json().results)
  }


  GetSingle(): Observable<any> {
    return this._http.get(this.apiUrl).map((response) => response.json().results.doc)
  }

}
