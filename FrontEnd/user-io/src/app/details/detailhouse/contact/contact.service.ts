import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ContactService {
  url="https://hcmutefslio.herokuapp.com/api/v1/house/detail/contact/"
  constructor(private http: Http) { }

  getInfo(id): Observable<any>{
    return this.http.get(this.url + id).map(res=>res.json().results);
  }
}
