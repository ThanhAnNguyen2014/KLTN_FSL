import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $.getScript('../../../assets/js/app.js');
  }

}
