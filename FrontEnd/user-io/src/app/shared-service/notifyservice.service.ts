import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NotifyserviceService {

  constructor(private http: Http) { }
  saveNotify(data){
    console.log(data);
    return new Promise((resolve, reject)=>{
      this.http.post('https://hcmutefslio.herokuapp.com/api/v1/notify', data)
      .map(res=>res.json())
      .subscribe(res=>{
        resolve(res);
      }, err=>{
        reject(err);
      });
    });
  }

}
