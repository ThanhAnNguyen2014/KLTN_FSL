import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';


import { DetailsComponent } from './details.component';
import { SearchdetailsComponent } from './searchdetails/searchdetails.component';
import { HeaderComponent } from './shared/header/header.component';
import { LeftsideComponent } from './shared/leftside/leftside.component';
import { DetailhouseComponent } from './detailhouse/detailhouse.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'details', pathMatch: 'full' },
  {
    path: 'details', component: DetailsComponent,
    children: [
      { path: 'search-details', component: SearchdetailsComponent },
      { path: 'detaisl-house', component: DetailhouseComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'edit-profile', component: EditprofileComponent }

    ]
  },

]

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes)
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
