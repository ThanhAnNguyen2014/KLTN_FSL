import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { ProfileService } from '../profile/profile.service';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { FirebaseApp } from 'angularfire2';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { AuthenticationService } from '../../Auth/services/authentication.service';
import { SharedserviceService } from '../../shared-service/sharedservice.service';
declare var $: any;
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
  providers: [ProfileService, AuthenticationService]
})
export class EditprofileComponent implements OnInit {
  url: string;
  imgUrl: string;
  gender: boolean;
  folder = 'avatar-user';
  files: File;
  filesToUpload: Array<File>;
  @Output() myCommentPost = new EventEmitter();
  public user;
  constructor(
    @Inject(FirebaseApp) firebaseApp: any,
    private profileSevice: ProfileService,
    private ng2ImgMaxService: Ng2ImgMaxService,
    private router: Router,
    private auth: AuthenticationService,
    private shareService: SharedserviceService
  ) { }

  ngOnInit() {
    // $.getScript('../../../assets/js/jasny-bootstrap.min.js');
    // $.getScript('../../../assets/js/fileinput.min.js');
    this.loadInfo();
    $.getScript('../../../assets/js/app.js');


  }
  loadInfo() {
    this.profileSevice.getUsers().subscribe((res) => {
      this.user = res.doc;
    })
  }
  detectFiles(event) {
    this.files = event.target.files[0];
    this.ng2ImgMaxService.resizeImage(this.files, 400, 400).subscribe((result) => {
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
    this.url = './assets/images/avatar-user.png';
  }
  OnUpdate(f: NgForm) {
    f.value.gender = (<HTMLInputElement>document.getElementById("gender")).checked;
    f.value.image = this.url;
    console.log(f.value);
    this.profileSevice.updateUsers(f.value).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/details/profile']);
    })
  }
  
}
