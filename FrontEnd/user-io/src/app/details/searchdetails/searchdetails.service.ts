import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
@Injectable()
export class SearchdetailsService {
  private url = 'http://localhost:3300/search-house/'
  constructor(private http: Http) { }
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
    return this.http.get(this.url + '?q=' + searchString + '&pricefrom=' + pricefrom + '&priceto=' + priceto + '&page=' + page + '&size=' + size, options).map((res) => res.json().results);
  }
  searchAllHouse(page, size) {
    let headers = new Headers({
      'Accept': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + 'all?' + '&page=' + page + '&size=' + size, options).map((res) => res.json().results);
  }
  searchForHousePice(pricefrom, priceto, page, size) {
    let headers = new Headers({
      'Accept': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + 'price?' + '&pricefrom=' + pricefrom + '&priceto=' + priceto + '&page=' + page + '&size=' + size, options).map(res => res.json().results);
  }
}
