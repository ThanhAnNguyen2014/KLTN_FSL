import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";


@Injectable()
export class ProfileService {

  private apiUrl="http://5914085a08cca6001102777a.mockapi.io/USER/";

  constructor(private _http:Http) {

   }
   /**
    * 
    * get info landlord
    */
    GetSingle(id: object): Observable<any> {
    return this._http.get(this.apiUrl +id).map((response) => response.json())
  }
}
