import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-homesingle',
  templateUrl: './homesingle.component.html',
  styleUrls: ['./homesingle.component.css']
})
export class HomesingleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $.getScript('../../../assets/js/home.js');
    $.getScript('../../../assets/js/app.js" type="text/javascript');
  }

}
