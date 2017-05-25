import { Component, OnInit } from '@angular/core';
import initDatetimepickers = require('../../../../assets/js/init/initDatetimepickers.js');

@Component({
  selector: 'app-detailroom',
  templateUrl: './detailroom.component.html',
  styleUrls: ['./detailroom.component.css']
})
export class DetailroomComponent implements OnInit {

  flagRenter: boolean = false;
  flagRoom: boolean = false;
  constructor() { }

  ngOnInit() {
    // if ($(".selectpicker").length != 0) {
    //   $(".selectpicker").selectpicker();
    // }
    initDatetimepickers();
  }

}
