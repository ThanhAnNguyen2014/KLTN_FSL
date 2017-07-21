import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../Auth/services/authentication.service';
import { SharedserviceService } from '../../shared-service/sharedservice.service';
declare var $: any;
@Component({
  selector: 'detail-app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers:[]
})
export class SigninComponent implements OnInit {
  user: any = {};
  error;
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private shareService: SharedserviceService,
  ) { }

  ngOnInit() {
    // reset login status
    //this.authenticationService.logout();
  }

  login() {
    this.auth.login(this.user.username, this.user.password)
      .subscribe((result) => {
        if (result == true) {
          $('#signin').modal('hide');
          this.error = '';
          // get info user
        //  this.profileService.getUsers()
        //  .subscribe(res=>{
        //    console.log(res);
        //  }, err=>{
        //    console.log(err);
        //  })
          this.shareService.setInfoUser();
        }
        else {
          this.error = result;
          console.log(this.error);
        }
      });
  }
  logout() {
    this.auth.logout();
  }

}
