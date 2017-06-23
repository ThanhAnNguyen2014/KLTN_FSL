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
import { ListhouseComponent } from './manageposts/listhouse/listhouse.component';
import { EdithouseComponent } from './manageposts/edithouse/edithouse.component';
import { DetailroomComponent } from './managerooms/detailroom/detailroom.component';

import { NavbarModule } from '../shared/navbar/navbar.module';
import { FooterModule } from '../shared/footer/footer.module';
import { SidebarModule } from '../sidebar/sidebar.module';
import { CKEditorModule } from 'ng2-ckeditor';


const appRoutes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'infolandlord/profile/:id', component: ProfileComponent },
      { path: 'infolandlord/changepass', component: ChangepassComponent },
      { path: 'manageposts/newpost', component: NewpostComponent },
      { path: 'manageposts/listhouse', component: ListhouseComponent },
      { path: 'manageposts/detailhouse/:id', component: DetailhouseComponent },
      { path: 'manageposts/edithouse/:id', component: EdithouseComponent },
      { path: 'managerooms/createroomtype', component: CreateroomtypeComponent },
      { path: 'managerooms/rooms', component: RoomsComponent },
      { path: 'managerooms/roomdetail/:id', component: DetailroomComponent },
    ]
  },
  // { path: 'dashboard', component: HomeComponent },
  // { path: 'infolandlord/profile/:id', component: ProfileComponent },
  // { path: 'infolandlord/changepass', component: ChangepassComponent },
  // { path: 'manageposts/newpost', component: NewpostComponent },
  // { path: 'manageposts/listhouse', component:  ListhouseComponent},
  // //{ path: 'manageposts/detailhouse', component: DetailhouseComponent },
  // {path:'manageposts/detailhouse/:id', component:DetailhouseComponent},
  // { path: 'manageposts/edithouse/:id', component:  EdithouseComponent},
  // { path: 'managerooms/createroomtype', component: CreateroomtypeComponent },
  // { path: 'managerooms/rooms', component: RoomsComponent },
  // { path: 'managerooms/rooms/detail', component: DetailroomComponent },
]
@NgModule({
  imports: [
    CommonModule,
    //   BrowserModule,
    FormsModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    CKEditorModule,
    // DataTablesModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [
    DashboardComponent,
    HomeComponent,
    ProfileComponent,
    NewpostComponent,
    ChangepassComponent,
    DetailhouseComponent,
    CreateroomtypeComponent,
    RoomsComponent,
    ListhouseComponent,
    EdithouseComponent,
    DetailroomComponent,
  ],
  // exports: [DashboardComponent]
})
export class DashboardModule { }
