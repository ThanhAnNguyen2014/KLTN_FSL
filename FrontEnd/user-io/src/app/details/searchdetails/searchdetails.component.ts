import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SearchdetailsService } from './searchdetails.service';
import { SharedserviceService } from '../../shared-service/sharedservice.service';
import { Subscription } from 'rxjs/Subscription';
declare var google;
declare var $: any;
declare var InfoBox;

@Component({
  selector: 'app-searchdetails',
  templateUrl: './searchdetails.component.html',
  styleUrls: ['./searchdetails.component.css'],
  providers: [SearchdetailsService]
})
export class SearchdetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  public sub: Subscription;
  public map: any;
  public houses: any;
  public myLatLng: { lat: number; lng: number; };
  public originLatLng: { lat: number; lng: number; };
  public price_house_m: any;



  constructor(private searchService: SearchdetailsService, private shareService: SharedserviceService) {
    this.sub = this.shareService.getDataSearch().subscribe((value) => {
      this.houses = value;
      this.initMap(this.houses);
      this.sub.unsubscribe();
    });

  }

  ngOnInit() {
    //this.initMap();
  }
  ngAfterViewInit(): void {
    $.getScript('../../../assets/js/app.js');
  }


  initMap(houses) {

    this.myLatLng = { lat: 10.868496544882658, lng: 106.80623095263672 }
    //this.price_house_m = (house._source.price).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    var map = new google.maps.Map(document.getElementById('mapView'), {
      zoom: 12,
      center: this.myLatLng,
      draggable: true
    });
    this.addMaker(houses, map);

    /* var addMaker = function (houses, map) {
       houses.forEach((prop, i) => {
         var latlng = new google.maps.LatLng(parseFloat(prop.position.lat), parseFloat(prop.position.lng));
         var marker = new google.maps.Marker({
           position: this.latlng,
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
           '<img src="' + house._source.image + '">' +
           '<div class="propBg">' +
           '<div class="propPrice">' + prop._source.price + ' VNĐ' + '</div>' +
           '<div class="propType">' + prop._source.status + '</div>' +
           '</div>' +
           '</div>' +
           '<div class="paWrapper">' +
           '<div class="propTitle">' + prop._source.title + '</div>' +
           '<div class="propAddress">' + prop._source.address + '</div>' +
           '</div>' +
           '<div class="clearfix"></div>' +
           '<div class="infoButtons">' +
           '<a class="btn btn-sm btn-round btn-gray btn-o closeInfo">Close</a>' +
           '<a href="single.html" class="btn btn-sm btn-round btn-green viewInfo">View</a>' +
           '</div>' +
           '</div>';
 
         google.maps.event.addListener(marker, 'click', (function (marker, i) {
           return function () {
             infobox.setContent(contentString);
             infobox.open(map, marker);
           }
         })(marker, i));
 
         $(document).on('click', '.closeInfo', function () {
           infobox.open(null, null);
         });
         markers.push(marker);
       });
       console.log(markers);
     }*/
  }
  addMaker(houses, map) {
    var markers = [];
    // custom infowindow object
    var infobox = new InfoBox({
      disableAutoPan: false,
      maxWidth: 202,
      pixelOffset: new google.maps.Size(-101, -285),
      zIndex: null,
      boxStyle: {
        background: "url('../../../assets/images/infobox-bg.png') no-repeat",
        opacity: 1,
        width: "202px"
      },
      closeBoxMargin: "28px 26px 0px 0px",
      closeBoxURL: "",
      infoBoxClearance: new google.maps.Size(1, 1),
      pane: "floatPane",
      enableEventPropagation: false
    });
    houses.forEach((prop, i) => {
      var latlng = new google.maps.LatLng(parseFloat(prop._source.lat), parseFloat(prop._source.lng));
      var marker = new google.maps.Marker({
        position: latlng,
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
        '<img src="' + prop._source.image + '">' +
        '<div class="propBg">' +
        '<div class="propPrice">' + prop._source.price + ' VNĐ' + '</div>' +
        '<div class="propType">' + prop._source.status + '</div>' +
        '</div>' +
        '</div>' +
        '<div class="paWrapper">' +
        '<div class="propTitle">' + prop._source.title + '</div>' +
        '<div class="propAddress">' + prop._source.address + '</div>' +
        '</div>' +
        '<div class="clearfix"></div>' +
        '<div class="infoButtons">' +
        '<a class="btn btn-sm btn-round btn-gray btn-o closeInfo">Close</a>' +
        '<a href="#/details/detail-house/' + prop._id + '" class="btn btn-sm btn-round btn-green viewInfo">View</a>' +
        '</div>' +
        '</div>';

      google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
          infobox.setContent(contentString);
          infobox.open(map, marker);
        }
      })(marker, i));

      $(document).on('click', '.closeInfo', function () {
        infobox.open(null, null);
      });
      markers.push(marker);
    });
  }


  ngOnDestroy() {
    //this.sub.unsubscribe();
  }
}
