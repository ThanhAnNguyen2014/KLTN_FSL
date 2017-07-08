import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CommentsService {
  public jwt;
  public token;
  public url = 'https://hcmutefslio.herokuapp.com/api/v1/house/detail/'
  constructor(private http: Http) {
    this.jwt = JSON.parse(localStorage.getItem('currentUser'));
    if (this.jwt) {
      this.token = this.jwt.token;
    }
  }

  // get all comment by id house
  getComments(id): Observable<any> {
    let headers = new Headers({
      'Accept': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + id + '/comment', options).map((res) => res.json().results);
  }
  removeComment(id): Observable<any> {
    let headers = new Headers({
      'Authorization': this.token,
      'Accept': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.url + 'comment/' + id, options).map((res) => res.json().results);
  }
}
