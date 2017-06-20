import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";


@Injectable()
export class ProfileService {

  private apiUrl = "https://hcmutefslio.herokuapp.com/api/v1/landlord/";

  constructor(private _http: Http) {

  }
  /**
   * 
   * get info landlord depend on id_landlord
   */
  GetSingle(id: object): Observable<any> {
    return this._http.get(this.apiUrl + id).map((response) => response.json().results.doc)
  }

  Update(id: object, data: any): Observable<any> {
    return this._http.put(this.apiUrl + id, data).map((response) => response.json().results.doc)
  }
}
