import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var google;
declare var $: any;
@Component({
  selector: 'app-searchdetails',
  templateUrl: './searchdetails.component.html',
  styleUrls: ['./searchdetails.component.css']
})
export class SearchdetailsComponent implements OnInit, AfterViewInit {
 
  public map: any;
  constructor() {
     
   }

  ngOnInit() {

   this.initMap();
   
  }
   ngAfterViewInit(): void {
    $.getScript('../../../assets/js/app.js');
  }


  initMap() {
    this.map = new google.maps.Map(document.getElementById('mapView'), {
      center: { lat: 10.851238, lng: 106.772222 },
      zoom: 16
    });
  }

}
