import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../Auth/services/authentication.service';
declare var $: any;
@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }
  closemodal() {
    $('#action').modal('hide');
  }
  signout() {
    this.auth.logout();
    $('#action').modal('hide');
  }
}
