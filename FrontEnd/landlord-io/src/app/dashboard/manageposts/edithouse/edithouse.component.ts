import { Component, OnInit } from '@angular/core';
import initMaps = require('../../../../assets/js/init/initMaps.js');
import { Subscription } from "rxjs/Subscription";
import { Router, ActivatedRoute } from "@angular/router";
import { EdithouseService } from './edithouse.service';
import initNotifySuccess = require('../../../../assets/js/init/notify-success.js');
import { NgForm } from "@angular/forms";

/**
 * Models
 */
export class House {

  status: string;
  longtutide: string;
  latutide: string;
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
  //private house: any;
  house: House = null;
  public statuses = [{name: "Mới" }, {name: "Cũ" }];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private edithouseservice: EdithouseService
  ) { }

  ngOnInit() {

    this.subscription = this.activatedRoute.params.subscribe(params => {
      this._id = params['id'];

      console.log(this._id);
    });

    this.edithouseservice.GetSingle(this._id).subscribe((data) => {
      this.house = data;
    });
  }
  SaveForm(f: NgForm) {
    this.house.service_price.electricity_price = f.value.electricity_price;
    this.house.service_price.water_price = f.value.water_price;
    this.house.service_price.internet_price = f.value.internet_price;
    this.house.service_price.garbage_price = f.value.garbage_price;
    this.edithouseservice.Update(this._id, this.house).subscribe(response => {
      if (response) {
        initNotifySuccess('Update success', 'success');
        this.router.navigate(['manageposts/listhouse']);
      }
    })
  }

}
