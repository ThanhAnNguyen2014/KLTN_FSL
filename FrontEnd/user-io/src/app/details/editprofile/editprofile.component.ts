import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
declare var $: any;
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
  providers: [ProfileService]
})
export class EditprofileComponent implements OnInit {

  public user;
  constructor(private profileSevice: ProfileService) { }

  ngOnInit() {
    $.getScript('../../../assets/js/app.js');
    $.getScript('../../../assets/js/fileinput.min.js');
    this.loadInfo();
  }
  loadInfo() {
    this.profileSevice.getUsers().subscribe((res) => {
      this.user = res.doc;
      console.log(this.user);
    })
  }

}
