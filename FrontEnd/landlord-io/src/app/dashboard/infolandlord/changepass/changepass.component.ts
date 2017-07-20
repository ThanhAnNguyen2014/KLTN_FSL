import { Component, OnInit } from '@angular/core';
import { ChangepassService } from './changepass.service';
import initNotifySuccess = require('../../../../assets/js/init/notify-success.js');
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css'],
  providers: [ChangepassService]
})
export class ChangepassComponent implements OnInit {

  private info: any;
  private landlord: any = {};

  constructor(
    private changepassservice: ChangepassService,
    private router: Router
  ) { }

  ngOnInit() {}


  ngSubmit(f) {
    const landlord = {
      oldpass: this.landlord.password,
      newpass: this.landlord.newpassword,
    }
    this.changepassservice.Changepass(landlord).subscribe((res) => {
      initNotifySuccess('Change success', 'success');
      this.router.navigate(['/dashboard/home']);
    })

  }

}
