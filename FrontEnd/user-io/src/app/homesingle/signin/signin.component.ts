import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../Auth/services/authentication.service';
declare var $: any;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [AuthenticationService]
})
export class SigninComponent implements OnInit {

  user: any = {};
  error;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    // reset login status
    //this.authenticationService.logout();
  }

  login() {
    this.authenticationService.login(this.user.username, this.user.password)
      .subscribe((result) => {
        if (result == true) {
          $('#signin').modal('hide');
          this.error = '';
          this.router.navigate(['/']);
        }
        else {
          this.error = result;
          console.log(this.error);
        }
      });
  }
  logout() {
    this.authenticationService.logout();
  }
}
