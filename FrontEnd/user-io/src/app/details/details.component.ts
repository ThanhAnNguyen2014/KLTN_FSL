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
    // $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBesDGtkcvFGS4KVDJpAl7bDBeSWroWh3I&v=3');
     $.getScript('../../../assets/js/infobox.js');
     $.getScript('../../../assets/js/app.js');
    
  }

}
