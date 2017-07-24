import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { JwtHelper } from 'angular2-jwt';
@Injectable()
export class SliderService {

  private apiUrl = "https://hcmutefslio.herokuapp.com/api/v1/area/";
  private url = 'https://hcmutefslio.herokuapp.com/search-house/'
  constructor(private http: Http) {

  }
  loadProvinces() {
    return this.http.get(this.apiUrl + 'provinces').map(res => res.json().results);
  }
  loadDistricts(id: string) {
    return this.http.get(this.apiUrl + 'districts/' + id).map(res => res.json().results);
  }
  loadWards(id: string) {
    return this.http.get(this.apiUrl + 'wards/' + id).map(res => res.json().results);
  }
  searchHouse(searchString, page, size) {
    let headers = new Headers({
      'Accept': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + '?q=' + searchString + '&pricefrom=' + '&priceto=' + '&page=' + page + '&size=' + size, options).map((res) => res.json().results);
  }
   searchHouseWithPrice(searchString, pricefrom, priceto, page, size) {
    let headers = new Headers({
      'Accept': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + '?q=' + searchString + '&pricefrom='+pricefrom + '&priceto='+ priceto + '&page=' + page + '&size=' + size, options).map((res) => res.json().results);
  }
}
