import { Component, OnInit } from '@angular/core';
import initMaps = require('../../../../assets/js/init/initMaps.js');
import { DetailhouseService } from './detailhouse.service';
import { Subscription } from "rxjs/Subscription";
import { Router, ActivatedRoute } from "@angular/router";
declare var google;

@Component({
  selector: 'app-detailhouse',
  templateUrl: './detailhouse.component.html',
  styleUrls: ['./detailhouse.component.css'],
  providers: [DetailhouseService]
})
export class DetailhouseComponent implements OnInit {

  private _id: object;
  private subscription: Subscription;
  private house: any;
  constructor(
    private router: Router, private activatedRoute: ActivatedRoute,
    private detailhouseservice: DetailhouseService
  ) { }

  ngOnInit() {
    // this.initMap();
    this.Loaddata();
  }
  // Loaddata(): Promise<any> {
  //   this.subscription = this.activatedRoute.params.subscribe(params => {
  //     this._id = params['id'];
  //   });

  //   return new Promise((resolve, reject) => {
  //     this.detailhouseservice.GetSingle(this._id).subscribe((data) => {
  //       this.house = data;
  //       this.LatLng = { lat: +this.house.latitude, lng: +this.house.longitude }
  //       resolve(this.LatLng);
  //     });
  //   });
  // }

  Loaddata() {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this._id = params['id'];
    });

    this.detailhouseservice.GetSingle(this._id).subscribe((data) => {
      this.house = data;
      this.initMap(+this.house.latitude, +this.house.longitude);
    });
  }
  // initMap() {
  //   this.Loaddata().then((LatLng) => {
  //     let map = new google.maps.Map(document.getElementById('mymap'), {
  //       zoom: 17,
  //       center: LatLng
  //     });
  //     var marker = new google.maps.Marker({
  //       position: LatLng,
  //       map: map,
  //     });

  //   });

  //   /*
  //   var myLatLng = { lat: 10.850542, lng: 106.772242 };
  //   var map = new google.maps.Map(document.getElementById('mymap'), {
  //     zoom: 17,
  //     center: myLatLng
  //   });

  //   // Place a draggable marker on the map
  //   var marker = new google.maps.Marker({
  //     position: myLatLng,
  //     map: map,
  //   });
  //   */
  // }
  initMap(lat: number, lng: number) {
    let LatLng = { lat, lng };
    let map = new google.maps.Map(document.getElementById('mymap'), {
      zoom: 17,
      center: LatLng
    });
    var marker = new google.maps.Marker({
      position: LatLng,
      map: map,
    });
  }
}