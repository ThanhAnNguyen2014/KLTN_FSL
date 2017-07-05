import { Component, OnInit } from '@angular/core';
declare var google;
@Component({
  selector: 'app-searchdetails',
  templateUrl: './searchdetails.component.html',
  styleUrls: ['./searchdetails.component.css']
})
export class SearchdetailsComponent implements OnInit {
  public map:any;
  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
        this.map = new google.maps.Map(document.getElementById('mapView'), {
          center: {lat: 10.851238, lng: 106.772222},
          zoom: 16
        });
      }

}
