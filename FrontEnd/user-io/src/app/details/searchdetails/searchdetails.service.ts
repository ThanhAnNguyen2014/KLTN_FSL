import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
@Injectable()
export class SearchdetailsService {
  private url = 'https://hcmutefslio.herokuapp.com/search-house/'
  constructor(private http: Http) { }
  searchHouse(searchString) {
    let headers = new Headers({
      'Accept': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + '?q=' + searchString + '&pricefrom=' + '&priceto=', options).map((res) => res.json().results);
  }
  searchHouseWithPrice(searchString, pricefrom, priceto) {
    let headers = new Headers({
      'Accept': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + '?q=' + searchString + '&pricefrom=' + pricefrom + '&priceto=' + priceto, options).map((res) => res.json().results);
  }
  searchAllHouse() {
    let headers = new Headers({
      'Accept': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + 'all?', options).map((res) => res.json().results);
  }
  searchForHousePice(pricefrom, priceto) {
    let headers = new Headers({
      'Accept': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + 'price?' + '&pricefrom=' + pricefrom + '&priceto=' + priceto, options).map(res => res.json().results);
  }
}
