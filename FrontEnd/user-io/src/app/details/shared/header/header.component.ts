import { Component, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit {
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
  }
  getInfo() {
    this.headersevice.getInfo().subscribe(
      res => {
        if (res.message) {
          console.log(res.message);
        }
        else {
          this.user = res.doc;
        }
      }
    )
  }

}
