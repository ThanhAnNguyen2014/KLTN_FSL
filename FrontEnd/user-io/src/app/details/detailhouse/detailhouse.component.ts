import { Component, OnInit } from '@angular/core';
import { DetailhouseService } from './detailhouse.service'
import { Router, ActivatedRoute } from '@angular/router';
import { House, ServicePrice } from './detailhouse'
declare var $: any;
declare var google;
declare var InfoBox;


@Component({
  selector: 'app-detailhouse',
  templateUrl: './detailhouse.component.html',
  styleUrls: ['./detailhouse.component.css'],
  providers: [DetailhouseService]
})
export class DetailhouseComponent implements OnInit {

  public myLatLng: { lat: number; lng: number; };
  private id: any;
  // public house: House;
  // public serviceprice: ServicePrice;
  public house: any;
  public price_house_m: any;

  constructor(
    private detailhouseservice: DetailhouseService,
    private router: Router,
    private activatedroute: ActivatedRoute,

  ) {
  }

  ngOnInit() {

    $.getScript('../../../assets/js/app.js');
    this.activatedroute.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
    this.getHouse(this.id);
  }

  initMap() {
    this.myLatLng = { lat: parseFloat(this.house.latitude), lng: parseFloat(this.house.longitude) }
    this.price_house_m = (this.house.price).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    var map = new google.maps.Map(document.getElementById('mapView'), {
      zoom: 16,
      center: this.myLatLng,
      draggable: false
    });
    // custom infowindow object
    var infobox = new InfoBox({
      disableAutoPan: false,
      maxWidth: 202,
      pixelOffset: new google.maps.Size(-101, -285),
      zIndex: null,
      boxStyle: {
        background: "url('../../../assets/images/infobox-bg.png') no-repeat",
        opacity: 1,
        width: "202px",
        height: "245px"
      },
      closeBoxMargin: "28px 26px 0px 0px",
      closeBoxURL: "",
      infoBoxClearance: new google.maps.Size(1, 1),
      pane: "floatPane",
      enableEventPropagation: false
    });

    // Place a draggable marker on the map
    var marker = new google.maps.Marker({
      position: this.myLatLng,
      map: map,
      icon: new google.maps.MarkerImage(
        '../../../assets/images/marker-green.png',
        null,
        null,
        null,
        new google.maps.Size(36, 36)
      ),
      draggable: false,
      animation: google.maps.Animation.DROP,
    });

    var contentString = '<div class="infoW">' +
      '<div class="propImg">' +
      '<img src="' + this.house.image + '">' +
      '<div class="propBg">' +
      '<div class="propPrice">' + this.price_house_m + ' VNĐ' + '</div>' +
      '<div class="propType">' + this.house.status + '</div>' +
      '</div>' +
      '</div>' +
      '<div class="paWrapper">' +
      '<div class="propTitle">' + this.house.title + '</div>' +
      '<div class="propAddress">' + this.house.address + '</div>' +
      '</div>' +
      '<div class="propRating">' +
      '<span class="fa fa-star"></span>' +
      '<span class="fa fa-star"></span>' +
      '<span class="fa fa-star"></span>' +
      '<span class="fa fa-star"></span>' +
      '<span class="fa fa-star-o"></span>' +
      '</div>' +
      '<ul class="propFeat">' +
      '<li><span class="icon-drop"></span> ' + '3' + '</li>' +
      '<li><span class="icon-frame"></span> ' + '2640' + '</li>' +
      '</ul>' +
      '<div class="clearfix"></div>' +
      '<div class="infoButtons">' +
      '<a class="btn btn-sm btn-round btn-gray btn-o closeInfo">Close</a>' +
      '<a href="single.html" class="btn btn-sm btn-round btn-green viewInfo">View</a>' +
      '</div>' +
      '</div>';


    marker.addListener('click', function () {
      infobox.setContent(contentString);
      infobox.open(map, marker);
    });
    $(document).on('click', '.closeInfo', function () {
      infobox.open(null, null);
    });

  }
  getHouse(id: object) {
    this.detailhouseservice.getHouseById(this.id).subscribe((res) => {
      this.house = res;
      this.initMap();
      console.log(this.house);
    },
      (err) => {
        console.log('Error: ' + err)
      },
      () => { console.log('Load data success!'); }
    );
  }

}
