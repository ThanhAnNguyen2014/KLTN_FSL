import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';
import { AuthenticationService } from '../../../Auth/services/authentication.service';
//import { Ng2ImgMaxService } from 'ng2-img-max';
//import * as firebase from 'firebase';

@Injectable()
export class NewpostService {

  public id;
  public jwt;
  public decodedJwt;
  public token;
  public jwtHelper: JwtHelper = new JwtHelper();
  headers: any;
  options: any;

  folder = 'images-house';
  //private apiUrl = "http://5914085a08cca6001102777a.mockapi.io/House";
  private apiUrl = "https://hcmutefslio.herokuapp.com/api/v1/house/";

  constructor(
    private _http: Http,
    private authenticationService: AuthenticationService,
    //private ng2ImgMaxService: Ng2ImgMaxService
  ) {
    this.jwt = JSON.parse(localStorage.getItem('currentUser'));
    this.decodedJwt = this.jwtHelper.decodeToken(this.jwt.token);
    this.id = this.decodedJwt.id;
    this.token = this.jwt.token;
    // add authorization header with jwt token
    this.headers = new Headers({
      'Authorization': this.token,
      'Accept': 'application/json'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }
  // GetList(): Observable<any[]> {
  //     return this._http.get(this.apiUrl).map((response: Response) => response.json())
  // }
  // GetSingle(id: number): Observable<any> {
  //     return this._http.get(this.apiUrl + id).map((response: Response) => response.json())
  // }

  // Update(id: number, data: any): Observable<any> {
  //     return this._http.put(this.apiUrl + id, data).map((response: Response) => response.json())
  // }

  Add(data: any): Observable<any> {
    return this._http.post(this.apiUrl, data, this.options).map((res) => res.json().results)
  }

  /**
   * Code service uplaod image by Thang use Promise 
  */
  // uploadImages(filesToUpload: File[]): Promise<any> {
  //   let filesArray: File[] = Array.from(filesToUpload);

  //   let promises = filesArray.map((file) => {
  //     return new Promise((resolve, reject) => {

  //       this.ng2ImgMaxService.resizeImage(file, 800, 450).subscribe((result) => {
  //         var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
  //           imgUrl = '';
  //         for (var i = 0; i < 6; i += 1) {
  //           imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
  //         }
  //         let storageRef = firebase.storage().ref();
  //         let path = `/${this.folder}/${imgUrl + ".jpg"}`;
  //         let iRef = storageRef.child(path);
  //         iRef.put(result).then((snapshot) => {
  //           let url = snapshot.downloadURL;
  //           resolve(url);
  //         }).catch((err) => {
  //           reject(err);
  //         });
  //       })
  //     });
  //   });


  //   return new Promise((resolve, reject) => {
  //     Promise.all(promises).then((urls) => {
  //       let concatUrls = "";
  //       urls.map((url) => {
  //         concatUrls += url + ";";
  //       })
  //       resolve(concatUrls);
  //     });
  //   });
  // }
}
