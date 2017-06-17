import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ListhouseService {
  private apiUrl = "https://hcmutefslio.herokuapp.com/api/v1/houses/all";

  constructor(private _http: Http) { }



  GetList(): Observable<any[]> {
    return this._http.get(this.apiUrl).map((response) => response.json().results)
  }



  Delete(id: object):Observable<any>{
    return this._http.delete("https://hcmutefslio.herokuapp.com/api/v1/house/" + id,{}).map((res) => res.json().results);
  }

}
