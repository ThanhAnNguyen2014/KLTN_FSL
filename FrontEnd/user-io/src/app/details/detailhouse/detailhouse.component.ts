import { Component, OnInit, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { DetailhouseService } from './detailhouse.service'
import { Router, ActivatedRoute } from '@angular/router';
import { House, ServicePrice } from './detailhouse';
import { ContactService } from './contact/contact.service';
import { AuthenticationService } from '../../Auth/services/authentication.service';
import { NotifyserviceService } from '../../shared-service/notifyservice.service';
import { SharedserviceService } from '../../shared-service/sharedservice.service';
declare var $: any;
declare var google;
declare var InfoBox;
import * as io from 'socket.io-client';
import { Subscription } from "rxjs/Subscription";
import { FacebookService, InitParams, UIParams, UIResponse } from 'ngx-facebook';


@Component({
  selector: 'app-detailhouse',
  templateUrl: './detailhouse.component.html',
  styleUrls: ['./detailhouse.component.css'],
  providers: [DetailhouseService, ContactService, FacebookService]
})
export class DetailhouseComponent implements OnInit, OnDestroy {


  public socket;
  @ViewChild('contactChild') contactLandlord;
  @ViewChild('postComment') postComment;
  @ViewChild('comment') comment;
  public myLatLng: { lat: number; lng: number; };
  public originLatLng: { lat: number; lng: number; };
  private id: any;
  public house: any;
  public imageSlide = [];
  public price_house_m: any;
  public flagcheck: boolean;
  public _originPlace = '';
  public _destinationPlace = '';
  public rooms: any;
  public numberRoom = 0;
  public infolandlord: any;
  public sub: Subscription;
  public message = '';
  public id_landlord;
  public houseSlider: any;
  public houseSlider1: any;
  public houseSlider2: any;

  constructor(
    private detailhouseservice: DetailhouseService,
    private contactsevice: ContactService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private auth: AuthenticationService,
    private notifySevice: NotifyserviceService,
    private shareService: SharedserviceService,
    private fb: FacebookService
  ) { }

  ngOnInit() {
    $.getScript('../../../assets/js/app.js');
    this.flagcheck = true;
    this.activatedroute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getHouse(this.id);
    this.getAllRoom(this.id);
    this.initFB();
    this.sub = this.shareService.getInfoUser().subscribe(res => {
      if (res !== null) {
        this.postComment.getInfoFromDetail();
      }
    }, err => {
      console.log(err);
    });
    this.getHousesSlider();

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
        width: "202px"
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
      console.log(this.house);
      this.id_landlord = this.house.id_landlord;
      this.getInfoLandlord(this.house.id_landlord);
      this.initMap();
      this.imageSlide = this.house.image.split(';');
      this.imageSlide.splice(this.imageSlide.length - 1, 1);

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

      if (res === 'No Item in database!') {
        this.numberRoom = 0;
        this.rooms = null;
      } else {
        this.rooms = res;
        console.log(this.rooms);
        this.numberRoom = this.rooms.length;
      }
    })
  }
  isActive(url: string) {
    return url === this.imageSlide[0];
  }
  sendNotify(id_room, title_room) {
    /**Check user rentroom */
    this.detailhouseservice.checkUserRentRoom().subscribe(res => {
      if (res.doc.status === false) {
        this.message = 'Tài khoản này đã được dùng để thuê phòng!';
      }
      else {
        var object_user = this.detailhouseservice.getIdUser();
        var id_user = object_user.id_user;
        var username = object_user.username;
        var content = {
          id_user: id_user,
          id_landlord: this.id_landlord,
          id_room: id_room,
          description: 'Tài khoản ' + username + ' tham gia đặt phòng ' + title_room + '.'
        }
         this.socket = io('http://localhost:4000');
         //this.socket = io('http://hcmutefslio.herokuapp.com:32066');
        this.notifySevice.saveNotify(content).then(result => {
          this.socket.emit('new-notify', result);
          this.message = 'Bạn đã gửi thông báo đặt phòng đến chủ trọ, vui lòng theo dõi email để biết thêm thông tin chi tiết.';
        }, err => {
          console.log(err);
        });
      }
    }, err => {
      console.log(err);
    })
  }
  initFB() {
    var fbParams: InitParams = {
      appId: '118343442136601',
      xfbml: true,
      version: 'v2.10'
    };
    this.fb.init(fbParams);
  }
  share(houseinput) {
    var house = houseinput;
    var price = (house.price).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    let fbUiParams: UIParams = {
      method: 'share',
      href: 'http://localhost:4200/details/detail-house/' + house._id,
      // href:'https://github.com/ThanhAnNguyen2014/KLTN_FSL',
      mobile_iframe: 'true',
      caption: 'Hãy chia sẽ thông tin cho những người cần thiết!',
      description: house.title + 'Giá: ' + price + ' VNĐ',
      picture: house.image,
    };
    this.fb.ui(fbUiParams);
  }
  getHousesSlider() {
    this.detailhouseservice.getSixHouse().subscribe(res => {
      this.houseSlider = res;
      this.houseSlider1 = this.houseSlider.slice(0, 3);
      this.houseSlider2 = this.houseSlider.slice(3, 6);
    }, err => {
      console.log(err);
    })
  }
  clickHouseSlider(id){
    this.getHouse(id);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
