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
  private load: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    $.getScript('../assets/js/init/initMenu.js');

  }

  ngOnInit() {
  }

  login() {
    this.load = true;
    this.authenticationService.login(this.landlord.username, this.landlord.password)
      .subscribe((result) => {
        if (result == true) {
          this.error = '';
          this.router.navigate(['/dashboard/home/']);
        }
        else {
          this.load = false;
          this.error = result;
          (<HTMLInputElement>document.getElementById("password")).value = '';
          console.log(this.error);
        }
      });
  }


}
