import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $.getScript('../../../assets/js/app.js');
    $.getScript('../../../assets/js/fileinput.min.js');
  }

}
