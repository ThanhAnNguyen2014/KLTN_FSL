import { Component, OnInit, OnChanges, Inject } from '@angular/core';
import initDatetimepickers = require('../../../../assets/js/init/initDatetimepickers.js');
import { ProfileService } from './profile.service';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { NgForm } from "@angular/forms";
import * as firebase from 'firebase';
import { FirebaseApp } from 'angularfire2';
import { Observable } from 'rxjs';
import initNotifySuccess = require('../../../../assets/js/init/notify-success.js');
import { Ng2ImgMaxService } from 'ng2-img-max';

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

  url: any;
  image: any;
  folder = 'avatar-landlord';
  files: File;
  filesToUpload: Array<File>;

  constructor(
    @Inject(FirebaseApp) firebaseApp: any,
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private profileservice: ProfileService,
    private ng2ImgMaxService: Ng2ImgMaxService
  ) { }

  ngOnInit(): void {
    this.LoadData();
    initDatetimepickers();
  }

  LoadData() {
    this.profileservice.GetSingle().subscribe((data) => {
      this.info = data;
    });
  }

  SaveForm(form: NgForm) {
    this.info.gender = (<HTMLInputElement>document.getElementById("gender")).checked;
    this.info.image = this.url;
    this.profileservice.Update(this.info).subscribe(response => {
      if (response) {
        initNotifySuccess('update success', 'success');
        this.router.navigate(['/dashboard/home']);
      }
    })
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
     this.ng2ImgMaxService.resize([this.filesToUpload[0]], 200, 200).subscribe((result) => {
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

}
