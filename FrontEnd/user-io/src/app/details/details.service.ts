import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class DetailsService {
  private subject = new Subject<any>();
  constructor() { }
  sendData(message: string) {
    this.subject.next({ text: message });
  }
  getData(): Observable<any> {
        return this.subject.asObservable();
    }
}
