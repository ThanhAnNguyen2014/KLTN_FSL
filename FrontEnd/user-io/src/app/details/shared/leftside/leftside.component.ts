import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../Auth/services/authentication.service';
@Component({
  selector: 'app-leftside',
  templateUrl: './leftside.component.html',
  styleUrls: ['./leftside.component.css'],
  providers: [AuthenticationService]
})
export class LeftsideComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

}
