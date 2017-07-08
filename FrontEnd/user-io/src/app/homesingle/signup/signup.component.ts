import { Component, OnInit } from '@angular/core';
import { SignupService } from './signup.service';
declare var $;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [SignupService]
})
export class SignupComponent implements OnInit {

  user: any = {};
  error;
  notify;
  constructor(private signupService: SignupService) {
    this.error = '';
  }

  ngOnInit() {
  }

  register() {
    const user = {
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      username: this.user.username,
      email: this.user.email,
      phone: this.user.phone,
      identitycard: this.user.identitycard,
      password: this.user.password,
      passwordconfirm: this.user.passwordconfirm
    }

    if (this.signupService.confirmPassword(user.password, user.passwordconfirm)) {
      // validate username, email
      this.signupService.validateUser(user).subscribe(
        res => {
          if (res.results.message) {
            this.error = res.results.message;
          }
          else {
            console.log(user);
            this.error = '';
            // 
            this.signupService.registerUser(user).subscribe(
              res => {
                if (res.results.message) {
                  this.error = res.results.message;
                }
                else {
                  console.log(res.results.doc);
                  // $('#signup').modal('hide');
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
