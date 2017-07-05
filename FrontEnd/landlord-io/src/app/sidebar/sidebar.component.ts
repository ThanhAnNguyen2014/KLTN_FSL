import { Component, OnInit, Injectable } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { MenuType } from './sidebar.metadata';
import { AuthenticationService } from '../Auth/services/authentication.service';
import { JwtHelper } from 'angular2-jwt';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

@Injectable()
export class SidebarComponent implements OnInit {

  public menuItems: any[];

  public id;
  public jwt;
  public decodedJwt;
  public token;
  public jwtHelper: JwtHelper = new JwtHelper();
  private apiUrl = "https://hcmutefslio.herokuapp.com/api/v1/landlord/";

  private landlord: any;

  constructor(
    private _http: Http,
    private authenticationService: AuthenticationService
  ) {
    this.jwt = JSON.parse(localStorage.getItem('currentUser'));
    this.decodedJwt = this.jwtHelper.decodeToken(this.jwt.token);
    this.id = this.decodedJwt.id;
    this.token = this.jwt.token;
    this.GetSingle(this.id).subscribe((data) => {
      this.landlord = data;
    });
  }

  ngOnInit() {
    $.getScript('../../assets/js/sidebar-moving-tab.js');
    this.menuItems = ROUTES.filter(menuItem => menuItem.menuType !== MenuType.BRAND);
    
  };

  /**
  * 
  * get info landlord depend on id_landlord
  */
  GetSingle(id: object): Observable<any> {
    // add authorization header with jwt token
    let headers = new Headers({
      'Authorization': this.token,
      'Accept': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    return this._http.get(this.apiUrl + id, options).map((response) => response.json().results.doc)
  }
}
