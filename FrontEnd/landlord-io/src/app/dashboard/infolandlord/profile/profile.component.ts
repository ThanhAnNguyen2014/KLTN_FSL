import { Component, OnInit, OnChanges } from '@angular/core';
import initDatetimepickers = require('../../../../assets/js/init/initDatetimepickers.js');
import { ProfileService } from './profile.service';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
// import { $ } from "protractor/built";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {
    


  private _id: object;
  private subscription: Subscription;
  private info: any;
  private datecurrent: Date;

  constructor(
    private router: Router, private activatedRoute: ActivatedRoute,
    private profileservice: ProfileService
  ) { }

  ngOnInit(): void {
    // this.datecurrent = new Date;
    // $.getScript('../../../../assets/js/plugins/bootstrap-datetimepicker.js');
    // if ($(".selectpicker").length != 0) {
    //   $(".selectpicker").selectpicker();
    // }
    // initDatetimepickers();


    this.subscription = this.activatedRoute.params.subscribe(params => {
      this._id = params['id'];
      console.log(this._id);
    });

    this.profileservice.GetSingle(this._id).subscribe((data) => {
      this.info = data;
      console.log(data);
    });
  }
  SaveForm(form:NgForm){
    console.log(form.value);
  }


}
