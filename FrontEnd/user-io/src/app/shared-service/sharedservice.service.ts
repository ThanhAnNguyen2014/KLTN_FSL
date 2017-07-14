import { Injectable, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedserviceService {
  public dataSearch = new Subject<object>();
  public textSearch$ = this.dataSearch.asObservable();

  public textSearchBehaviour = new BehaviorSubject<string>('');
  public textSearchBehaviour$ = this.textSearchBehaviour.asObservable();

  setDataSearch(value: object) {
    this.dataSearch.next(value);
  }
  getDataSearch(): Observable<any> {
    return this.dataSearch.asObservable();
  }
  setTextSearchBehaviour(value: string){
    this.textSearchBehaviour.next(value);
    console.log(this.textSearchBehaviour.value);
    console.log(this.textSearchBehaviour$);
  }
   getTextSearchBehaviour(): Observable<any> {
   return this.textSearchBehaviour.asObservable();
  }
}
