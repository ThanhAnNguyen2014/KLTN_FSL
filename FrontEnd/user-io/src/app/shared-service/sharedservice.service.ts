import { Injectable, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/Subject';



@Injectable()
export class SharedserviceService {
  public dataSearch = new BehaviorSubject<object>(null);
  public textSearch$ = this.dataSearch.asObservable();

  constructor(){

  }
  setDataSearch(value: object) {
    this.dataSearch.next(value);
  }
  getDataSearch(): Observable<any> {
    return this.dataSearch.asObservable();
  }
  

}
