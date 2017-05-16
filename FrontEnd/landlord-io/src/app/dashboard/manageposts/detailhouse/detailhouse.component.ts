import { Component, OnInit } from '@angular/core';
import initMaps = require('../../../../assets/js/init/initMaps.js');
import { DetailhouseService } from './detailhouse.service';
import { Subscription } from "rxjs/Subscription";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-detailhouse',
  templateUrl: './detailhouse.component.html',
  styleUrls: ['./detailhouse.component.css'],
  providers: [DetailhouseService]
})
export class DetailhouseComponent implements OnInit {

  private _id: object;
  private subscription: Subscription;
  private house: any;
  constructor(
    private router: Router, private activatedRoute: ActivatedRoute,
    private detailhouseservice: DetailhouseService
  ) { }

  ngOnInit() {
    //initMaps();

    // this.detailhouseservice.GetSingle(this._id).subscribe(res => {
    //   if (res) {
    //     console.log(res);
    //   }
    // });

    this.subscription = this.activatedRoute.params.subscribe(params => {
      this._id = params['id'];

       console.log(this._id);
    });

    this.detailhouseservice.GetSingle(this._id).subscribe((data) => {
      this.house = data;
    });
  }
  gotodashboard(){
    this.router.navigate(['/dashboard']);
  }
  SaveForm(){
    
  }

}
