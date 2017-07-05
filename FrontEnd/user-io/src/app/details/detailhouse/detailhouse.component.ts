import { Component, OnInit, ViewChild } from '@angular/core';
import { DetailhouseService } from './detailhouse.service'
import { Router, ActivatedRoute } from '@angular/router';
import { House, ServicePrice } from './detailhouse';
import { ContactService } from './contact/contact.service';
declare var $: any;
declare var google;
declare var InfoBox;


@Component({
  selector: 'app-detailhouse',
  templateUrl: './detailhouse.component.html',
  styleUrls: ['./detailhouse.component.css'],
  providers: [DetailhouseService, ContactService]
})
export class DetailhouseComponent implements OnInit {
  @ViewChild('contactChild') contactLandlord;
  public myLatLng: { lat: number; lng: number; };
  public originLatLng: { lat: number; lng: number; };
  private id: any;
  // public house: House;
  // public serviceprice: ServicePrice;
  public house: any;
  public price_house_m: any;
  public flagcheck: boolean;
  public _originPlace = '';
  public _destinationPlace = '';
  // public autocomplete: string;
  public rooms: any;
  public numberRoom = 0;
  public infolandlord: any;
  constructor(
    private detailhouseservice: DetailhouseService,
    private contactsevice: ContactService,
    private router: Router,
    private activatedroute: ActivatedRoute,

  ) {

  }

  ngOnInit() {
    this.flagcheck = true;
    $.getScript('../../../assets/js/app.js');
    this.activatedroute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getHouse(this.id);

    this.getAllRoom(this.id);
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
      this.getInfoLandlord(this.house.id_landlord);
      this.initMap();
      console.log(this.house);
    },
      (err) => {
        console.log('Error: ' + err)
      },
      () => { console.log('Load data success!'); }
    );
  }
  getContact() {
    this.contactLandlord.getInfoLandlord();
  }
  getInfoLandlord(id: object) {
    this.contactsevice.getInfo(id).subscribe((res) => {
      if (res.message) {
        console.log(res.message);
      }
      else {
        this.infolandlord = res.doc;
      }
    })
  }

  isSelected(value) {
    this.flagcheck = value;
    //let flag = (<HTMLInputElement>document.getElementById('location')).value;
    // let a= (<HTMLInputElement>document.getElementById('autocomplete')).value;
    console.log(this.flagcheck);

  }
  autocompleteFunction() {
    var autocomplete;
    //var geocoder = new google.maps.Geocoder;
    autocomplete = new google.maps.places.Autocomplete((<HTMLInputElement>document.getElementById('inputcomplete')), { types: ['geocode'] });
  }
  direction() {
    var that = this;
    let _orign;
    var geocoder = new google.maps.Geocoder;
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    let auto = (<HTMLInputElement>document.getElementById('inputcomplete')).value;
    console.log(auto);
    $('#directionForm').modal('hide');
    if (this.flagcheck == true) {
      var map = new google.maps.Map(document.getElementById('mapView'), {
        center: this.myLatLng,
        zoom: 16
      });

      // set map
      directionsDisplay.setMap(map);
      var infoWindow = new google.maps.InfoWindow;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          that.originLatLng = pos;
          console.log(that.originLatLng);
          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          // get positon of origin
          geocoder.geocode({ 'location': that.originLatLng }, function (results, status) {
            if (status === 'OK') {
              if (results[0]) {
                that.originLatLng = results[0].formatted_address;
                console.log(results[0].formatted_address);
              } else {
                window.alert('No results found');
              }
            }
          });
          // get destination
          geocoder.geocode({ 'location': that.myLatLng }, function (results, status) {
            if (status === 'OK') {
              console.log(that.myLatLng);
              console.log(results);
              if (results[0]) {
                that._destinationPlace = results[0].formatted_address;
                // route 
                directionsService.route({
                  origin: that.originLatLng,
                  destination: that._destinationPlace,
                  travelMode: 'DRIVING',
                }, function (response, status) {
                  if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                    // console.log(directionsService.setDirections(response));
                  }
                });

              } else {
                window.alert('No results found');
              }
            }
          });


        }, function () {
          infoWindow.setPosition(map.getCenter());
          infoWindow.setContent(true ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
          //infoWindow.open(map);
        });
      } else {
        // Browser doesn't support Geolocation
        infoWindow.setPosition(map.getCenter());
        infoWindow.setContent(false ?
          'Error: The Geolocation service failed.' :
          'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
    }
    if (this.flagcheck == false && auto != null) {
      var map = new google.maps.Map(document.getElementById('mapView'), {
        center: this.myLatLng,
        zoom: 16
      });
      directionsDisplay.setMap(map);
      // get destination
      geocoder.geocode({ 'location': that.myLatLng }, function (results, status) {
        if (status === 'OK') {
          console.log(that.myLatLng);
          console.log(results);
          if (results[0]) {
            that._destinationPlace = results[0].formatted_address;
            // route 
            directionsService.route({
              origin: auto,
              destination: that._destinationPlace,
              travelMode: 'DRIVING',
            }, function (response, status) {
              if (status === 'OK') {
                directionsDisplay.setDirections(response);
                // console.log(directionsService.setDirections(response));
              }
            });
          } else {
            window.alert('No results found');
          }
        }
      });
      console.log('------ autocomplete search----');
    }


  }
  getAllRoom(id: object) {

    this.detailhouseservice.getAllRoomByIdHouse(this.id).subscribe((res) => {
      this.rooms = res;
      console.log(this.rooms);
      if (res === 'No Item in database!') {
        this.numberRoom = 0;
      } else {
        this.numberRoom = this.rooms.length;
      }
    })
  }
}
