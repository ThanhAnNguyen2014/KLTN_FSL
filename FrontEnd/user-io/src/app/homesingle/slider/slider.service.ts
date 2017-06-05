import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

@Injectable()
export class SliderService {

  private apiUrl = "http://localhost:3300/api/v1/area/";
  constructor(private http: Http) { }
  loadProvinces() {
    return this.http.get(this.apiUrl + 'provinces').map(res => res.json().results);
  }
  loadDistricts(id: string) {
    return this.http.get(this.apiUrl + 'districts/' + id).map(res => res.json().results);
  }
  loadWards(id: string) {
    return this.http.get(this.apiUrl + 'wards/' + id).map(res => res.json().results);
  }
}
