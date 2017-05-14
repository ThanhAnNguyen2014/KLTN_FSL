import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './infolandlord/profile/profile.component';
import { NewpostComponent } from './manageposts/newpost/newpost.component';
import { ChangepassComponent } from './infolandlord/changepass/changepass.component';
import { DetailhouseComponent } from './manageposts/detailhouse/detailhouse.component';
import { CreateroomtypeComponent } from './managerooms/createroomtype/createroomtype.component';
import { RoomsComponent } from './managerooms/rooms/rooms.component';



const appRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: HomeComponent },
  { path: 'infolandlord/profile', component: ProfileComponent },
  { path: 'infolandlord/changepass', component: ChangepassComponent },
  { path: 'manageposts/newpost', component: NewpostComponent },
  //{ path: 'manageposts/detailhouse', component: DetailhouseComponent },
  {path:'manageposts/detailhouse/:id', component:DetailhouseComponent},
  // {
  //   path: 'manageposts/detailhouse/:id', component: DetailhouseComponent,
  //   children: [
  //     { path: '', pathMatch: 'full' },
  //     // { path: 'overview', component: DetailhouseComponent },
  //     // { path: 'projects', component: DetailhouseComponent }
  //   ]
  // },
  { path: 'managerooms/createroomtype', component: CreateroomtypeComponent },
  { path: 'managerooms/rooms', component: RoomsComponent },
]
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    DashboardComponent,
    HomeComponent,
    ProfileComponent,
    NewpostComponent,
    ChangepassComponent,
    DetailhouseComponent,
    CreateroomtypeComponent,
    RoomsComponent
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
