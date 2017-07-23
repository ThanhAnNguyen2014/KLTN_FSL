import { Component, OnInit, Inject } from '@angular/core';
import { RoomsService } from './rooms.service';
import { Router, ActivatedRoute } from "@angular/router";
import initNotifySuccess = require('../../../../assets/js/init/notify-success.js');
import * as firebase from 'firebase';
import { FirebaseApp } from 'angularfire2';
import { Observable } from 'rxjs';
import { Ng2ImgMaxService } from 'ng2-img-max';

declare var swal: any;
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
  public temp: any; // chứa giá trị cập nhật tạo số phòng từ input html
  public houses: any[];

  url: any;
  image: any;
  folder = 'images-room';
  files: File;
  filesToUpload: Array<File>;
  listrooms = [];

  loadhousebyid: object;

  constructor(
    @Inject(FirebaseApp) firebaseApp: any,
    private roomsservice: RoomsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ng2ImgMaxService: Ng2ImgMaxService
  ) {
    this.LoadHouse();
    this.LoadRoomType();
  }

  ngOnInit() {
    this.newroom = {};
  }

  CreateRoom() {
    for (var i = 0; i < this.newroom.no_room; i++) {
      var room_temp: any = {
        id_house: '',
        id_roomtype: '',
        title: '',
        room_price: {
          price: ''
        },
        image: ''
      };
      room_temp.title = this.newroom.title + '-' + (i + 1);
      room_temp.id_house = this.newroom.id_house;
      room_temp.room_price.price = this.newroom.room_price;
      room_temp.id_roomtype = this.newroom.id_roomtype;
      room_temp.image = this.url;
      this.listrooms.push(room_temp);
    };
    this.roomsservice.AddNewRoom(this.listrooms).subscribe(res => { }, (err) => {
      console.log(err);
    });
    this.temp = this.newroom.no_room;
    this.LoadSingleRoomType(this.newroom.id_roomtype);
    this.newroom = {};
    initNotifySuccess('Add success', 'success');
    this.LoadTablebyId2();
  }

  LoadTablebyId() {
    this.loadhousebyid = this.loadhousebyid;
    this.roomsservice.GetListRoom(this.loadhousebyid).subscribe((response: any) => {
      this.rooms = response;
      console.log(response);
      $.getScript('../../../../assets/js/init/initDataTable.js');
    }, error => {
      console.log(error);
    });
  }

  LoadTablebyId2() {
    this.loadhousebyid = this.loadhousebyid;
    this.roomsservice.GetListRoom(this.loadhousebyid).subscribe((response: any) => {
      this.rooms = response;
    }, error => {
      console.log(error);
    });
  }

  LoadRoomType() {
    this.roomsservice.GetListRoomType().subscribe((response: any) => {
      this.roomtypes = response;
      console.log(response);
      $.getScript('../../../../assets/js/plugins/jquery.select-bootstrap.js');
      if ($(".selectpicker").length != 0) {
        $(".selectpicker").selectpicker();
      }
    }, error => {
      console.log(error);
    });
  }

  LoadHouse() {
    this.roomsservice.GetListHouse().subscribe((response: any) => {
      this.houses = response;
      this.loadhousebyid = this.houses[0]._id;
      this.LoadTablebyId();
      $.getScript('../../../../assets/js/plugins/jquery.select-bootstrap.js');
      setTimeout(() => {
        $('.select2-dropdown').selectpicker('refresh');
      }, 0);
    }, error => {
      console.log(error);
    });
  }

  LoadSingleRoomType(id: object) {
    this.roomsservice.GetSingleRoomType(id).subscribe((response) => {
      this.roomtype = response.doc;
      console.log(response);
      this.roomtype.no_room = this.roomtype.no_room + this.temp;
      this.temp = 0;
      this.roomsservice.UpdateValueRoomType(id, this.roomtype).subscribe(res => { });
    }, error => {
      console.log(error);
    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
    this.ng2ImgMaxService.resize([this.filesToUpload[0]], 800, 480).subscribe((result) => {
      var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
        imgUrl = '';
      for (var i = 0; i < 6; i += 1) {
        imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      console.log(imgUrl);
      let storageRef = firebase.storage().ref();
      let path = `/${this.folder}/${imgUrl + ".jpg"}`;
      let iRef = storageRef.child(path);
      iRef.put(result).then((snapshot) => {
        this.url = snapshot.downloadURL;
        console.log(this.url);
      });
    });
  }

  DeletedRoom(id: object, roomtitle) {
    var that = this;
    swal({
      title: 'Are you sure?',
      text: "Are you sure you want to delete " + roomtitle + "?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Yes!',
      buttonsStyling: false
    }).then(function () {
      let temp_id: any;
      that.roomsservice.GetSingleRoom(id).subscribe((res: any) => {
        temp_id = res.room.id_roomtype;
      });
      that.roomsservice.Delete(id).subscribe((response: any) => {
        if (response === 'Delete room success!') {
          console.log(response);

          that.temp = -1;
          that.LoadSingleRoomType(temp_id);
          swal({
            title: 'Deleted success!',
            text: 'Your request has been fulfilled',
            type: 'success',
            confirmButtonClass: "btn btn-success",
            buttonsStyling: false
          })
        }
        else{
          swal({
            title: 'Delete failed!',
            text: response,
            type: 'warning',
            confirmButtonClass: "btn btn-warning",
            buttonsStyling: false
          })
        }
      }, error => {
        console.log(error);
      });

    });
  }
}
