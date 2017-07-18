import { Component, OnInit } from '@angular/core';
import { SliderService } from './slider.service';
import { Subscription } from "rxjs/Rx";
import { AuthenticationService } from '../../Auth/services/authentication.service';
import { NgForm } from "@angular/forms";
import { SharedserviceService } from '../../shared-service/sharedservice.service';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";

declare var $;
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  providers: [SliderService]
})
export class SliderComponent implements OnInit {
  priceto: string;
  pricefrom: string;
  public provinces: any;
  public districs: any;
  public flag_pro: boolean;
  public flag_district: boolean;
  public flag_ward: boolean;
  public provincename: any;
  public districtname: any;
  public wardname: any;
  public wards: any;
  public isOnDist: boolean;
  public isOnWar: boolean;
  public houses: any;
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private sliderService: SliderService,
    private sharedService: SharedserviceService
  ) {
    console.log(auth.loggedIn());
    auth.loggedIn();

  }

  ngOnInit() {
    this.flag_pro = true;  // set stutus of drop down Province
    this.isOnDist = true;
    this.isOnWar = true;
    this.flag_district = true;
    this.flag_ward = true;
    this.getProvinces();
    this.pricefrom = "";
    this.priceto = "";

  }
  getProvinces() {
    this.sliderService.loadProvinces().subscribe(
      data => {
        //this.flag_pro = true;
        this.provinces = data;
      },
      (err) => { console.log('Error server! ... ' + err) },
      () => {
      }
    );
  }
  selectProvince(id, name, rank) {
    this.sliderService.loadDistricts(id).subscribe(
      data => {
        this.flag_pro = false;
        this.isOnDist = false;
        this.flag_district = true;
        this.flag_ward = true;
        this.provincename = rank + ' ' + name;
        this.districs = data;
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
    this.sliderService.loadWards(id).subscribe(
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
  search(f: NgForm) {
    var page = 0;
    var size = 10;
    var province = (<HTMLButtonElement>(document.getElementById("provincename"))).value;
    var district = (<HTMLButtonElement>(document.getElementById("district"))).value;
    var ward = (<HTMLButtonElement>(document.getElementById("ward"))).value;
    f.value.province = province;
    f.value.district = district;
    f.value.ward = ward;
    this.sharedService.setDataSearch(f.value);
    this.router.navigateByUrl('/details/search-details');
  }
}
