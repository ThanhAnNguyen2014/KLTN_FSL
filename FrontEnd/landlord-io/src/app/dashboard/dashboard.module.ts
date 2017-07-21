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
import { AuthGuard } from '../Auth/guards/auth.guard';
import { AuthenticationService } from '../Auth/services/authentication.service';

import { MomentModule } from 'angular2-moment';


const appRoutes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'infolandlord/profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'infolandlord/changepass', component: ChangepassComponent, canActivate: [AuthGuard] },
      { path: 'manageposts/newpost', component: NewpostComponent, canActivate: [AuthGuard] },
      { path: 'manageposts/listhouse', component: ListhouseComponent, canActivate: [AuthGuard] },
      { path: 'manageposts/detailhouse/:id', component: DetailhouseComponent, canActivate: [AuthGuard] },
      { path: 'manageposts/edithouse/:id', component: EdithouseComponent, canActivate: [AuthGuard] },
      { path: 'managerooms/createroomtype', component: CreateroomtypeComponent, canActivate: [AuthGuard] },
      { path: 'managerooms/rooms', component: RoomsComponent, canActivate: [AuthGuard] },
      { path: 'managerooms/roomdetail/:id', component: DetailroomComponent, canActivate: [AuthGuard] },
    ]
  },
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
    MomentModule,
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
  providers:[
    AuthGuard,
    AuthenticationService
  ]
  // exports: [DashboardComponent]
})
export class DashboardModule { }
