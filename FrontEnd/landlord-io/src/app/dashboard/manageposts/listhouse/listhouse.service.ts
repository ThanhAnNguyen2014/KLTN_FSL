import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';

@Injectable()
export class ListhouseService {
  private apiUrl = "http://5914085a08cca6001102777a.mockapi.io/House/";
  constructor(private _http: Http) { }
  GetList(): Observable<any[]> {
    return this._http.get(this.apiUrl).map((response) => response.json())
  }
}
