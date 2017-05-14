import { Component, OnInit } from '@angular/core';
import initDatetimepickers = require('../../../../assets/js/init/initDatetimepickers.js');
import { ProfileService } from './profile.service';

declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {
 

  datecurrent: Date;

  constructor(
    private profileservice: ProfileService
  ) { }



  ngOnInit(): void {
     this.datecurrent = new Date;
    $.getScript('../../../../assets/js/plugins/bootstrap-datetimepicker.js');
    if ($(".selectpicker").length != 0) {
      $(".selectpicker").selectpicker();
    }
    initDatetimepickers();

  }

}
