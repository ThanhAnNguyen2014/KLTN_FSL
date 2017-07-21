import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../../Auth/services/authentication.service';
import { HeaderService } from './header.service';
import { Subscription } from "rxjs/Subscription";
import { SharedserviceService } from '../../../shared-service/sharedservice.service';
declare var $;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [AuthenticationService, HeaderService]
})
export class HeaderComponent implements OnInit, OnDestroy {
  token;
  user: any;
  subscription: Subscription;
  constructor(private auth: AuthenticationService, private headersevice: HeaderService, private shareService: SharedserviceService) {

  }

  ngOnInit() {
    var token = localStorage.getItem('currentUser');
    if (token) {
      this.getInfo();
    }
    else {
      this.user = null;
    }
    // listen sub from  shareservice
    this.subscription = this.shareService.getInfoUser()
      .subscribe(res => {
        this.token = res;
        if (this.token !== null) {
          this.getInfoUserWithToken();
        }
      }, err => {
        console.log(err);
      });

  }

  getInfo() {
    this.headersevice.getInfo().subscribe(
      (res) => {
        if (res.message) {
          console.log(res.message);
        }
        else {
          this.user = res.doc;
        }
      }
    )
  }
  getInfoUserWithToken() {
    this.headersevice.getInfoUserWithToken(this.token)
      .subscribe(response => {
        this.user = response.doc;
        console.log(this.user);
      }, err => {
        console.log(err);
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
