import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { AuthenticationService } from '../../Auth/services/authentication.service';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService, AuthenticationService]
})
export class ProfileComponent implements OnInit {

  public user;
  constructor(
    private profileService: ProfileService,
    private router: Router,
    private auth: AuthenticationService
  ) {
    this.getInfo();
  }

  ngOnInit() {
    $.getScript('../../../assets/js/app.js');

  }
  getInfo() {
    this.profileService.getUsers().subscribe(
      res => {
        if (res.message) {
          console.log(res.message);
        }
        else {
          console.log(res.doc);
          this.user = res.doc;
        }
      })
  }

}
