import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
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
export class DetailhouseComponent implements OnInit, AfterViewInit, AfterContentInit {

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
  ngAfterContentInit() {

  }
  async initMap() {
    this.myLatLng = { lat: 10.850542, lng: 106.772242 };

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
      '<img src="../../../assets/images/prop/1-1.png">' +
      '<div class="propBg">' +
      '<div class="propPrice">' + '$1,340,000' + '</div>' +
      '<div class="propType">' + 'For Sale' + '</div>' +
      '</div>' +
      '</div>' +
      '<div class="paWrapper">' +
      '<div class="propTitle">' + 'Sophisticated Residence' + '</div>' +
      '<div class="propAddress">' + '38-62 Water St, Brooklyn, NY 11201, USA' + '</div>' +
      '</div>' +
      '<div class="propRating">' +
      '<span class="fa fa-star"></span>' +
      '<span class="fa fa-star"></span>' +
      '<span class="fa fa-star"></span>' +
      '<span class="fa fa-star"></span>' +
      '<span class="fa fa-star-o"></span>' +
      '</div>' +
      '<ul class="propFeat">' +
      '<li><span class="fa fa-moon-o"></span> ' + '2' + '</li>' +
      '<li><span class="icon-drop"></span> ' + '3' + '</li>' +
      '<li><span class="icon-frame"></span> ' + '2640' + '</li>' +
      '</ul>' +
      '<div class="clearfix"></div>' +
      '<div class="infoButtons">' +
      '<a class="btn btn-sm btn-round btn-gray btn-o closeInfo">Close</a>' +
      '<a href="single.html" class="btn btn-sm btn-round btn-green viewInfo">View</a>' +
      '</div>' +
      '</div>';

    // var infobox = new google.maps.InfoWindow({
    //   content: contentString
    // });

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
