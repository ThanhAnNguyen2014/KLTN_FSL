import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {routing} from './details.routes';
import { StarRatingModule } from 'angular-star-rating';

import { DetailsComponent } from './details.component';
import { SearchdetailsComponent } from './searchdetails/searchdetails.component';
import { HeaderComponent } from './shared/header/header.component';
import { LeftsideComponent } from './shared/leftside/leftside.component';
import { DetailhouseComponent } from './detailhouse/detailhouse.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ContactComponent } from './detailhouse/contact/contact.component';
import { RateHouseComponent } from './detailhouse/rate-house/rate-house.component';
//import {AuthGuard} from '../Auth/guards/auth.guard';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    StarRatingModule,
    routing
  ],
  declarations: [
    DetailsComponent,
    SearchdetailsComponent,
    HeaderComponent,
    LeftsideComponent,
    DetailhouseComponent,
    ProfileComponent,
    EditprofileComponent,
    ContactComponent,
    RateHouseComponent
  ],
  //providers:[AuthGuard]
})
export class DetailsModule { }
