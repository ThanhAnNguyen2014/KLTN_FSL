import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";


@Injectable()
export class ProfileService {

  private apiUrl="https://hcmutefslio.herokuapp.com/api/v1/landlord/";

  constructor(private _http:Http) {

   }
   /**
    * 
    * get info landlord depend on id_user
    */
    GetSingle(id: object): Observable<any> {
    return this._http.get(this.apiUrl +id).map((response) => response.json())
  }
}
