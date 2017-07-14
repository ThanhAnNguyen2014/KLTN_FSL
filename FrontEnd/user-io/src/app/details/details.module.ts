import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {routing} from './details.routes';
import { StarRatingModule } from 'angular-star-rating';
import {MomentModule} from 'angular2-moment/moment.module';

import { DetailsComponent } from './details.component';
import { SearchdetailsComponent } from './searchdetails/searchdetails.component';
import { HeaderComponent } from './shared/header/header.component';
import { LeftsideComponent } from './shared/leftside/leftside.component';
import { DetailhouseComponent } from './detailhouse/detailhouse.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ContactComponent } from './detailhouse/contact/contact.component';
import { RateHouseComponent } from './detailhouse/rate-house/rate-house.component';
import { CommentsComponent } from './detailhouse/comments/comments.component';
import { PostcommentsComponent } from './detailhouse/postcomments/postcomments.component';
//import {AuthGuard} from '../Auth/guards/auth.guard';
import {SharedserviceService} from '../shared-service/sharedservice.service';
import {DetailsService} from './details.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    StarRatingModule,
    MomentModule,
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
    RateHouseComponent,
    CommentsComponent,
    PostcommentsComponent
  ],
  providers:[SharedserviceService, DetailsService]
})
export class DetailsModule { }
