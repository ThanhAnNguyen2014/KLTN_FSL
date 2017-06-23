import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {routing} from './details.routes';
//import { StarRatingModule } from 'angular-star-rating';

import { DetailsComponent } from './details.component';
import { SearchdetailsComponent } from './searchdetails/searchdetails.component';
import { HeaderComponent } from './shared/header/header.component';
import { LeftsideComponent } from './shared/leftside/leftside.component';
import { DetailhouseComponent } from './detailhouse/detailhouse.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';



@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    //StarRatingModule,
    routing
  ],
  declarations: [
    DetailsComponent,
    SearchdetailsComponent,
    HeaderComponent,
    LeftsideComponent,
    DetailhouseComponent,
    ProfileComponent,
    EditprofileComponent
  ]
})
export class DetailsModule { }
