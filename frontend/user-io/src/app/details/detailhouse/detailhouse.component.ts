import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-detailhouse',
  templateUrl: './detailhouse.component.html',
  styleUrls: ['./detailhouse.component.css']
})
export class DetailhouseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $.getScript('../../../assets/js/app.js');
  }

}
