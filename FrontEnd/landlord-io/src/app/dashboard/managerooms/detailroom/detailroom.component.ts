import { Component, OnInit, Input } from '@angular/core';
import initDatetimepickers = require('../../../../assets/js/init/initDatetimepickers.js');
import { DetailroomService } from './detailroom.service';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
declare var $: any;

@Component({
  selector: 'app-detailroom',
  templateUrl: './detailroom.component.html',
  styleUrls: ['./detailroom.component.css'],
  providers: [DetailroomService]
})
export class DetailroomComponent implements OnInit {
  form: any;

  private subscription: Subscription;
  flagRenter: boolean = false;
  flagRoom: boolean = false;
  private roomtypes: any[];
  private houses: any[];
  private room: any;

  private landlord: any;

  constructor(
    private detailroomservice: DetailroomService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit() {
    this.LoadRoom();
    this.LoadLandlord();
    initDatetimepickers();
    this.LoadRoomType();
    this.LoadHouse();
  }

  LoadRoom() {
    let _id: any;
    this.subscription = this.activatedRoute.params.subscribe(params => {
      _id = params['id'];
    });
    this.detailroomservice.GetSingleRoom(_id).subscribe(response => {
      this.room = response;
      console.log(this.room);
    }, err => {
      console.log(err);
    })
  }


  LoadLandlord() {
    this.detailroomservice.GetSingle().subscribe(response => {
      this.landlord = response;
      console.log(this.landlord);
    }, err => {
      console.log(err);
    })
  }



  LoadRoomType() {
    this.detailroomservice.GetListRoomType().subscribe((response: any) => {
      this.roomtypes = response;
      $.getScript('../../../../assets/js/plugins/jquery.select-bootstrap.js');
      setTimeout(() => {
        $('.select2-dropdown').selectpicker('refresh');
      }, 0);
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  LoadHouse() {
    this.detailroomservice.GetListHouse().subscribe((response: any) => {
      this.houses = response;
      $.getScript('../../../../assets/js/plugins/jquery.select-bootstrap.js');
      setTimeout(() => {
        $('.select2-dropdown').selectpicker('refresh');
      }, 0);
      console.log(response);
    }, error => {
      console.log(error);
    });
  }


}
