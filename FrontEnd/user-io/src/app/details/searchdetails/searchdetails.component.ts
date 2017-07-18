import { Component, OnInit, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { SearchdetailsService } from './searchdetails.service';
import { NgForm } from '@angular/forms';
import { SharedserviceService } from '../../shared-service/sharedservice.service';
import { SliderService } from '../../homesingle/slider/slider.service';
import { Subscription } from 'rxjs/Subscription';
declare var google;
declare var $: any;
declare var InfoBox;

@Component({
  selector: 'app-searchdetails',
  templateUrl: './searchdetails.component.html',
  styleUrls: ['./searchdetails.component.css'],
  providers: [SearchdetailsService, SliderService]
})
export class SearchdetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  public message: boolean;
  public provinces: any;
  public sub: Subscription;
  public myLatLng: { lat: number; lng: number; };
  public page;
  public size;
  public objectSearch;
  public houses: any;

  public districts: any;
  public flag_pro: boolean;
  public flag_district: boolean;
  public flag_ward: boolean;
  public provincename: any;
  public districtname: any;
  public wardname: any;
  public wards: any;
  public isOnDist: boolean;
  public isOnWar: boolean;

  constructor(private zone: NgZone,
    private searchService: SearchdetailsService,
    private shareService: SharedserviceService,
    private sliderSevice: SliderService
  ) {
  }
  ngOnInit() {
    this.flag_pro = true;
    this.isOnDist = true;
    this.isOnWar = true;
    this.flag_district = true;
    this.flag_ward = true;
    this.message = false;
    this.getDataSearch();
    this.getProvice();
  }
  getDataSearch() {
    this.sub = this.shareService.getDataSearch()
      .subscribe(
      value => {
        this.objectSearch = value;
        console.log(this.objectSearch);
        // Search with no data transmission
        if (this.objectSearch == null) {
          console.log('-- constructor');
          this.searchService.searchAllHouse(0, 10).subscribe(results => this.zone.run(() => {
            this.houses = results.doc.hits.hits;
            this.initMap(this.houses)
          }));
        }
        else {
          if (this.objectSearch != null) {
            // listening evernt set data from singlehome 
            /**if have data ==> search
             * else ==> search data with function get all house in database
             */
            if (this.objectSearch.province != "") {
              if (this.objectSearch.pricefrom != "") {
                // search with pricefrom and priceto
                console.log('--- search with price');
                this.searchService.searchHouseWithPrice(this.objectSearch.province, this.objectSearch.pricefrom, this.objectSearch.priceto, 0, 10)
                  .subscribe(
                  results => {
                    this.houses = results.doc.hits.hits;
                    console.log(this.houses);
                    this.initMap(this.houses);
                  }
                  )
              }
              else {
                // search without pricefrom and priceto
                console.log('--- search without price');
                this.searchService.searchHouse(this.objectSearch.province, 0, 10)
                  .subscribe(
                  results => {
                    this.houses = results.doc.hits.hits;
                    console.log(this.houses);
                    this.initMap(this.houses);
                  })
              }
              console.log('-- search with data tranfers from singleHome');
            }
            else {
              if (this.objectSearch.pricefrom == "") {
                console.log('-- search default');
                this.searchService.searchAllHouse(0, 10).subscribe(results => this.zone.run(() => {
                  this.houses = results.doc.hits.hits;
                  this.initMap(this.houses)
                }));
              }
              else {
                console.log('--search chi can gia');
                this.searchService.searchForHousePice(this.objectSearch.pricefrom, this.objectSearch.priceto, 0, 10).subscribe(results => {
                  this.houses = results.doc.hits.hits;
                  console.log(this.houses);
                  this.initMap(this.houses);
                })
              }
            }
          }
        }
      },
      err => console.log(err)
      )
  }
  //get provice 
  getProvice() {
    this.sliderSevice.loadProvinces()
      .subscribe(provinces => { this.provinces = provinces; })
  }
  selectProvince(id, name, rank) {
    this.sliderSevice.loadDistricts(id).subscribe(
      data => {
        this.flag_pro = false;
        this.isOnDist = false;
        this.flag_district = true;
        this.flag_ward = true;
        this.provincename = rank + ' ' + name;
        this.districts = data;
      },
      err => {
        console.log('Error server! ... ' + err)
      },
      () => {
        console.log('Load Districts success!');
      }
    )
  }
  selectDistrict(id, name, rank) {
    this.sliderSevice.loadWards(id).subscribe(
      data => {
        this.flag_district = false;
        this.isOnDist = false;
        this.isOnWar = false;
        this.flag_ward = true;
        this.districtname = rank + ' ' + name;
        this.wards = data;
      }
    )
  }
  selectWard(id, name, rank) {
    this.flag_ward = false;
    this.wardname = name;
  }

  submit(f: NgForm) {
    f.value.province = (<HTMLSpanElement>(document.getElementById("province"))).textContent;
    f.value.district = (<HTMLSpanElement>(document.getElementById("district"))).textContent;
    f.value.ward = (<HTMLSpanElement>(document.getElementById("ward"))).textContent;
    var slider = $('.priceSlider').slider('values');
    f.value.pricefrom = slider[0];
    f.value.priceto = slider[1];
    console.log(f.value);
    if (f.value.province != "-- Chọn Tỉnh/TP --") {
      if(f.value.district!="-- Chọn Quận/Huyện --"){

      }
    }
    else {
      if(f.value.pricefrom !="" && f.value.priceto!=""){
       console.log("--- search with price"); 
      }
      else{
        console.log('-- search all');
      }
    }
  }

  ngAfterViewInit(): void {
    $.getScript('../../../assets/js/app.js');
  }
  initMap(houses) {
    if (houses.length > 0) {
      this.myLatLng = { lat: parseFloat(this.houses[0]._source.lat), lng: parseFloat(this.houses[0]._source.lng) }
    }
    else {
      this.myLatLng = { lat: 10.851017, lng: 106.772313 }
    }

    var map = new google.maps.Map(document.getElementById('mapView'), {
      zoom: 12,
      center: this.myLatLng,
      draggable: true
    });
    this.addMaker(houses, map);
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
        '<div class="propPrice">' + (prop._source.price).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' VNĐ' + '</div>' +
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
    this.sub.unsubscribe();
    this.houses = null;
  }
}
