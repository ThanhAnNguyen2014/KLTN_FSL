import { Component, OnInit } from '@angular/core';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';
import initNotifySuccess = require('../../assets/js/init/notify-success.js');
declare var $: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [SignupService]
})
export class SignupComponent implements OnInit {

  landlord: any = {};
  error;
  notify;
  toggle= false;

  constructor(
    private signupService: SignupService,
    private router: Router,
  ) {
    this.error = '';
    $.getScript('../assets/js/init/initMenu.js');
  }

  ngOnInit() {
    this.toggle=true;
  }

  register() {
    const landlord = {
      firstname: this.landlord.firstname,
      lastname: this.landlord.lastname,
      username: this.landlord.username,
      phone: this.landlord.phone,
      email: this.landlord.email,
      identitycard: this.landlord.identitycard,
      password: this.landlord.password,
      passwordconfirm: this.landlord.passwordconfirm
    }
    if (this.signupService.confirmPassword(landlord.password, landlord.passwordconfirm)) {
      // validate username, email
      this.signupService.validateLandlord(landlord).subscribe(
        res => {
          if (res.results.message) {
            this.error = res.results.message;
          }
          else {
            console.log(landlord);
            this.error = '';
            // 
            this.signupService.registerLandlord(landlord).subscribe(
              res => {
                if (res.results.message) {
                  this.error = res.results.message;
                  initNotifySuccess('Register success! '+ res.results.message, 'success');
                  this.router.navigate(['']);
                }
                else {
                  console.log(res.results.doc);
                }
              }
            )
          }
        });
    }
    else {
      this.error = 'Password not matched';
    }
    
  }
}
