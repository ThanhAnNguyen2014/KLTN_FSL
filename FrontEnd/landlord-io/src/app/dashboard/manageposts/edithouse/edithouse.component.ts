import { Component, OnInit } from '@angular/core';
import initMaps = require('../../../../assets/js/init/initMaps.js');
import { Subscription } from "rxjs/Subscription";
import { Router, ActivatedRoute } from "@angular/router";
import { EdithouseService } from './edithouse.service';
import initNotifySuccess = require('../../../../assets/js/init/notify-success.js');
import { NgForm } from "@angular/forms";
import * as firebase from 'firebase';
import { FirebaseApp } from 'angularfire2';
import { Observable } from 'rxjs';
declare var $: any;
declare var google;

/**
 * Models
 */
export class House {

  status: string;
  longitude: string;
  latitude: string;
  price: number;
  image: string;
  title: string;
  description: string;
  address: string;
  range: number;
  service_price: Service_Price
}
export class Service_Price {
  electricity_price: number;
  water_price: number;
  internet_price: number;
  garbage_price: number;
}

@Component({
  selector: 'app-edithouse',
  templateUrl: './edithouse.component.html',
  styleUrls: ['./edithouse.component.css'],
  providers: [EdithouseService]
})
export class EdithouseComponent implements OnInit {

  private _id: object;
  private subscription: Subscription;
  house: House;
  // service_price: Service_Price;
  public statuses = [{ name: "Mới" }, { name: "Cũ" }];

  private lat: any;
  private lng: any;

  url: any;
  image: any;
  folder = 'fsl-io';
  files: File;
  filesToUpload: Array<File>;

  private ad: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private edithouseservice: EdithouseService
  ) {
    this.house = new House();
    this.house.service_price = new Service_Price();
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this._id = params['id'];
    });
    this.edithouseservice.GetSingle(this._id).subscribe((data) => {
      this.initMap(+data.latitude, +data.longitude);
      this.house = data;
      //this.initMap(+this.house.latitude, +this.house.longitude);
    });
  }

  SaveForm(f: NgForm) {
    this.house.service_price.electricity_price = f.value.electricity_price;
    this.house.service_price.water_price = f.value.water_price;
    this.house.service_price.internet_price = f.value.internet_price;
    this.house.service_price.garbage_price = f.value.garbage_price;
    this.house.image = this.url;
    this.house.latitude = this.lat;
    this.house.longitude = this.lng;
    console.log(this.ad);
    this.house.address = this.ad;
    this.edithouseservice.Update(this._id, this.house).subscribe((response) => {
      console.log(response);
      if (response) {
        initNotifySuccess('Update success', 'success');
        this.router.navigate(['/dashboard/manageposts/listhouse']);
      }
    })
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
    for (var index = 0; index < this.filesToUpload.length; index++) {
      this.files = fileInput.target.files[index];
      console.log(this.files);

      var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
      imgUrl = '';
      for (var i = 0; i < 6; i += 1) {
        imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      console.log(imgUrl);
      let storageRef = firebase.storage().ref();
      console.log(storageRef);
      let path = `/${this.folder}/${imgUrl + ".jpg"}`;
      console.log(path);
      let iRef = storageRef.child(path);
      iRef.put(this.files).then((snapshot) => {
        this.url = snapshot.downloadURL;
        console.log(this.url);
      });
    }
  }

  initMap(lat: number, lng: number) {
    let LatLng = { lat, lng };
    let map = new google.maps.Map(document.getElementById('mymap'), {
      zoom: 17,
      center: LatLng
    });
    var marker = new google.maps.Marker({
      position: LatLng,
      map: map,
      draggable: true,
    });

    var geocoder = new google.maps.Geocoder;

    let that = this;
    google.maps.event.addListener(marker, 'dragend', function () {
      that.lat = this.getPosition().lat();
      (<HTMLInputElement>document.getElementById("lat")).value = this.getPosition().lat();
      that.lng = this.getPosition().lng();
      (<HTMLInputElement>document.getElementById("lng")).value = this.getPosition().lng();

      var temp_latlng = { lat: that.lat, lng: that.lng };
      geocoder.geocode({ 'location': temp_latlng }, function (results, status) {
        if (status === 'OK') {
          if (results[1]) {
            (<HTMLInputElement>document.getElementById("address")).value = results[0].formatted_address;
            that.ad = results[0].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });

    });

    var input = document.getElementById('address');
    var autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', function () {
      var place = autocomplete.getPlace();
      console.log(place);
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        console.log(place.geometry.location);
        //map.setZoom(17);  // Why 17? Because it looks good.
      }
      marker.setPosition(place.geometry.location);
      that.lat = place.geometry.location.lat();
      (<HTMLInputElement>document.getElementById("lat")).value = place.geometry.location.lat();
      that.lng = place.geometry.location.lng();
      (<HTMLInputElement>document.getElementById("lng")).value = place.geometry.location.lng();
      that.ad = place.formatted_address;
    });
  }

}
