import { Injectable, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/Subject';



@Injectable()
export class SharedserviceService {
  public dataSearch = new BehaviorSubject<object>(null);
  public textSearch$ = this.dataSearch.asObservable();

  public infoUser = new BehaviorSubject<object>(null);
  public infoUser$ = this.infoUser.asObservable();

  public token;
  constructor() {

  }
  setDataSearch(value: object) {
    this.dataSearch.next(value);
  }
  getDataSearch(): Observable<any> {
    return this.dataSearch.asObservable();
  }

  setInfoUser() {
    this.token = localStorage.getItem('currentUser');
    this.infoUser.next(this.token);
  }
  getInfoUser(): Observable<any> {
    return this.infoUser.asObservable();
  }

}
