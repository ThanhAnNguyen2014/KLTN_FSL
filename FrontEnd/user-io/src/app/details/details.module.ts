import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {routing} from './details.routes';
<<<<<<< HEAD
//import { StarRatingModule } from 'angular-star-rating';
=======
import { StarRatingModule } from 'angular-star-rating';
>>>>>>> a2ba54efc32cfcc6a1396e4ac890c2e0143764c7

import { DetailsComponent } from './details.component';
import { SearchdetailsComponent } from './searchdetails/searchdetails.component';
import { HeaderComponent } from './shared/header/header.component';
import { LeftsideComponent } from './shared/leftside/leftside.component';
import { DetailhouseComponent } from './detailhouse/detailhouse.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
//import {AuthGuard} from '../Auth/guards/auth.guard';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
<<<<<<< HEAD
    //StarRatingModule,
=======
    StarRatingModule,
>>>>>>> a2ba54efc32cfcc6a1396e4ac890c2e0143764c7
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
  ],
  //providers:[AuthGuard]
})
export class DetailsModule { }
