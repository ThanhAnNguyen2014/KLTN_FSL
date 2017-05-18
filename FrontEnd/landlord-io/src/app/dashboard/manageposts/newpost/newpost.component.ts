import { Component, OnInit } from '@angular/core';
import initMaps = require('../../../../assets/js/init/initMaps.js');
import { NewpostService } from './newpost.service';
import { Router, ActivatedRoute } from '@angular/router';
import initNotifySuccess = require('../../../../assets/js/init/notify-success.js');
import { NgForm } from "@angular/forms";
declare var $: any;

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
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css'],
  providers: [NewpostService]
})
export class NewpostComponent implements OnInit {

  private _id: object;
  //private house: any;
  house: House = null;


  constructor(
    private router: Router, private activatedRoute: ActivatedRoute,
    private newpostService: NewpostService
  ) { }

  ngOnInit() {
    //initMaps();
    this.house = new House();
    this.house.service_price = new Service_Price();
  }

  SaveForm(f: NgForm) {
    console.log(f.value);
    this.house.service_price.electricity_price = f.value.electricity_price;
    this.house.service_price.water_price = f.value.water_price;
    this.house.service_price.internet_price = f.value.internet_price;
    this.house.service_price.garbage_price = f.value.garbage_price;
    console.log(this.house);
    this.newpostService.Add(this.house).subscribe(response => {

      if (response) {
        initNotifySuccess('Add success','success');
        //alert('add success');
        console.log(response);
        this.router.navigate(['/manageposts/listhouse']);
      }
    })

  }

}
