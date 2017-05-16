import { Component, OnInit } from '@angular/core';
import initMaps = require('../../../../assets/js/init/initMaps.js');
import { Subscription } from "rxjs/Subscription";
import { Router, ActivatedRoute } from "@angular/router";
import { EdithouseService } from './edithouse.service';

@Component({
  selector: 'app-edithouse',
  templateUrl: './edithouse.component.html',
  styleUrls: ['./edithouse.component.css'],
  providers: [EdithouseService]
})
export class EdithouseComponent implements OnInit {

  private _id: object;
  private subscription: Subscription;
  private house: any;

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

}
