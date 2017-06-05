import { Component, OnInit } from '@angular/core';
import { SliderService } from './slider.service';
import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  providers: [SliderService]
})
export class SliderComponent implements OnInit {
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

  constructor(private sliderService: SliderService) { }

  ngOnInit() {
    this.flag_pro = true;  // set stutus of drop down Province
    this.isOnDist = true;
    this.isOnWar = true;
    this.flag_district = true;
    this.flag_ward = true;
  }
  getProvinces() {
    this.sliderService.loadProvinces().subscribe(
      data => {
        //this.flag_pro = true;
        this.provinces = data;
      },
      (err) => { console.log('Error server! ... ' + err) },
      () => {
        console.log('Load provinces success!');
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
    console.log(this.wardname);
  }


}
