import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Auth/services/authentication.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {

  landlord: any = {};
  error;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {}

  login() {
    this.authenticationService.login(this.landlord.username, this.landlord.password)
      .subscribe((result) => {
        if (result == true) {
          $('#signin').modal('hide');
          this.error = '';
          this.router.navigate(['/dashboard/home/']);
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
