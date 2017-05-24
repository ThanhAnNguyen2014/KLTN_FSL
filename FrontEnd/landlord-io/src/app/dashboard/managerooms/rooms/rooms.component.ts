import { Component, OnInit } from '@angular/core';
import { RoomsService } from './rooms.service';
import { Router, ActivatedRoute } from "@angular/router";
import initNotifySuccess = require('../../../../assets/js/init/notify-success.js');

declare var $: any;
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  providers: [RoomsService]
})
export class RoomsComponent implements OnInit {

  private newroom: any;
  private rooms: any[];
  private roomtype: any;
  private roomtypes: any[];
  public temp: any;

  constructor(
    private roomsservice: RoomsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    $.getScript('../../../../assets/js/init/initDataTable.js');
    this.newroom = {};
    this.LoadTable();
    this.LoadRoomType();
  }

  CreateRoom() {
    for (var i = 0; i < this.newroom.no_room; i++) {
      var room_temp: any = {};
      room_temp.title = this.newroom.title + '-' + (i + 1);
      room_temp.room_price = this.newroom.room_price;
      console.log(this.newroom.room_type);
      room_temp.id_roomtype = this.newroom.room_type;
      this.roomsservice.Add(room_temp).subscribe(response => { })
    };
    this.temp=this.newroom.no_room;  
    this.LoadSingleRoomType(this.newroom.room_type);

    this.newroom = {};
    initNotifySuccess('Add success', 'success');
    this.LoadTable();
  }

  LoadTable() {
    this.roomsservice.GetListRoom().subscribe((response: any) => {
      this.rooms = response;
    }, error => {
      console.log(error);
    });
  }

  LoadRoomType() {
    this.roomsservice.GetListRoomType().subscribe((response: any) => {
      this.roomtypes = response;
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  LoadSingleRoomType(id: object) {
    this.roomsservice.GetSingleRoomType(id).subscribe((response: any) => {
      this.roomtype = response;
      this.roomtype.no_room= this.roomtype.no_room+this.temp;
      this.temp=0;
      this.roomsservice.UpdateValueRoomType(id,this.roomtype).subscribe(res=>{});
    }, error => {
      console.log(error);
    });
  }

}
