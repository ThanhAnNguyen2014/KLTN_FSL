import { Component, OnInit, Input, Inject } from '@angular/core';
import initDatetimepickers = require('../../../../assets/js/init/initDatetimepickers.js');
import { DetailroomService } from './detailroom.service';
import { Router, ActivatedRoute } from "@angular/router";
import { Ng2ImgMaxService } from 'ng2-img-max';
import * as firebase from 'firebase';
import { FirebaseApp } from 'angularfire2';
import { Subscription } from "rxjs/Subscription";
declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-detailroom',
  templateUrl: './detailroom.component.html',
  styleUrls: ['./detailroom.component.css'],
  providers: [DetailroomService]
})
export class DetailroomComponent implements OnInit {
  id: any;
  form: any;
  files: File;
  url: string;
  imgUrl: string;
  folder = 'images-room';
  flagRenter: boolean = false;
  flagRoom: boolean = false;
  private roomtypes: any[];
  private houses: any[];
  private room: any;
  private rentroom: any;

  private landlord: any;

  constructor(
    @Inject(FirebaseApp) firebaseApp: any,
    private detailroomservice: DetailroomService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ng2ImgMaxService: Ng2ImgMaxService
  ) { }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.LoadRoom();
    this.loadRentRoom();
    this.LoadLandlord();
    initDatetimepickers();
    this.LoadRoomType();
    this.LoadHouse();
  }

  LoadRoom() {
    this.detailroomservice.GetSingleRoom(this.id).subscribe(response => {
      this.room = response;
    }, err => {
      console.log(err);
    })
  }
  LoadLandlord() {
    this.detailroomservice.GetSingle().subscribe(response => {
      this.landlord = response;
    }, err => {
      console.log(err);
    })
  }
  LoadRoomType() {
    this.detailroomservice.GetListRoomType().subscribe((response: any) => {
      this.roomtypes = response.doc;
      $.getScript('../../../../assets/js/plugins/jquery.select-bootstrap.js');
      setTimeout(() => {
        $('.select2-dropdown').selectpicker('refresh');
      }, 0);
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
    }, error => {
      console.log(error);
    });
  }
  fileChangeEvent(event) {
    this.files = event.target.files[0];
    this.ng2ImgMaxService.resizeImage(this.files, 800, 480).subscribe((result) => {
      var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
      this.imgUrl = '';
      for (var i = 0; i < 6; i += 1) {
        this.imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      console.log(this.imgUrl);
      let storageRef = firebase.storage().ref();
      let path = `/${this.folder}/${this.imgUrl + ".jpg"}`;
      let iRef = storageRef.child(path);
      iRef.put(result).then((snapshot) => {
        this.url = snapshot.downloadURL;
        console.log(this.url);
      });
    });
  }
  deleteFiles() {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.folder}/${this.imgUrl + ".jpg"}`).delete()
    this.url = '../../../../assets/img/image-house-template.jpg';
  }
  SaveFormRoom(f) {
    f.image = this.url;
    this.detailroomservice.EditRoom(this.id, f).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  }
  loadRentRoom() {
    this.detailroomservice.getDetailRentRoom(this.id).subscribe(res => {
      this.rentroom = res.doc;
    }, err => {
      console.log(err.statusText);
    });
  }
  deleteRentRoomUser() {
    var that = this;
    swal({
      title: 'Are you sure?',
      text: "Are you sure you want to delete this record?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Yes!',
      buttonsStyling: false
    }).then(function () {

      that.detailroomservice.deletedRentRoomUser(that.id).subscribe((response: any) => {
        console.log('Delete success!');
        swal({
          title: 'Deleted success!',
          text: 'Your request has been fulfilled',
          type: 'success',
          confirmButtonClass: "btn btn-success",
          buttonsStyling: false
        });
      }
        , error => {
          swal({
            title: 'Delete failed!',
            text: 'Delete record failed, please try again later!',
            type: 'warning',
            confirmButtonClass: "btn btn-warning",
            buttonsStyling: false
          });
        });
    });
  }

}
