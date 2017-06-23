import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { DetailhouseService } from './detailhouse.service'
import { Router, ActivatedRoute } from '@angular/router';
import { House, ServicePrice } from './detailhouse'
declare var $: any;
declare var google;

@Component({
  selector: 'app-detailhouse',
  templateUrl: './detailhouse.component.html',
  styleUrls: ['./detailhouse.component.css'],
  providers: [DetailhouseService]
})
export class DetailhouseComponent implements OnInit, AfterViewInit,AfterContentInit {

  myLatLng: { lat: number; lng: number; };
  private id: any;
  house: House;
  serviceprice: ServicePrice;


  constructor(private detailhouseservice: DetailhouseService, private router: Router, private activatedroute: ActivatedRoute) {

  }
  ngOnInit() {
    $.getScript('../../../assets/js/app.js');
    this.activatedroute.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
    this.getHouse(this.id);
  }
  ngAfterViewInit() {
    //this.initMap();
  }
  ngAfterContentInit(){
    
  }
  async initMap() {
    this.myLatLng = { lat: 10.850542, lng: 106.772242 };

    var map = new google.maps.Map(document.getElementById('mapView'), {
      zoom: 16,
      center: this.myLatLng,
      draggable: false
    });

    // Place a draggable marker on the map
    var marker = new google.maps.Marker({
      position: this.myLatLng,
      center: this.myLatLng,
      map: map,
      draggable: false,
      title: "Drag and drop the marker to select the position!"
    });

  }
  getHouse(id: object) {

    this.detailhouseservice.getHouseById(this.id).subscribe((res) => {
      //console.log(res);
      this.initMap();
      this.house = res;
      console.log(this.house);
    },
      (err) => {
        console.log('Error: ' + err)
      },
      () => { }
    );
  }

}
