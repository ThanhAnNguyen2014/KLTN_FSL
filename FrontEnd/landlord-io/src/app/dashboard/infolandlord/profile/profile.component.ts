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
    private profileservice: ProfileService
  ) { }

  ngOnInit(): void {
    this.LoadData();
    initDatetimepickers();
  }

  LoadData() {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this._id = params['id'];
    });

    this.profileservice.GetSingle(this._id).subscribe((data) => {
      this.info = data;
    });
  }

  SaveForm(form: NgForm) {
    this.info.gender = (<HTMLInputElement>document.getElementById("gender")).checked;
    this.info.image = this.url;
    this.profileservice.Update(this._id, this.info).subscribe(response => {
      if (response) {
        initNotifySuccess('Add success', 'success');
        this.router.navigate(['/dashboard/home']);
      }
    })
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
    for (var index = 0; index < this.filesToUpload.length; index++) {
      this.files = fileInput.target.files[index];
      console.log(this.files);

      var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
        imgName = '';
      for (var i = 0; i < 6; i += 1) {
        imgName += possible.charAt(Math.floor(Math.random() * possible.length));
      }
       console.log(imgName);
      
      let storageRef = firebase.storage().ref();
      let path = `/${this.folder}/${imgName + ".jpg"}`;
      let iRef = storageRef.child(path);
      iRef.put(this.files).then((snapshot) => {
        this.url = snapshot.downloadURL;
        console.log(this.url);
      });
    }
  }


}
