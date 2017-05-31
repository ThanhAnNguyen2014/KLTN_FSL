import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// import { DashboardModule } from './dashboard/dashboard.module';
// import { NavbarModule } from './shared/navbar/navbar.module';
// import { FooterModule } from './shared/footer/footer.module';
// import { SidebarModule } from './sidebar/sidebar.module';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ChangepassComponent } from './dashboard/infolandlord/changepass/changepass.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "app/dashboard/home/home.component";
import { ProfileComponent } from "app/dashboard/infolandlord/profile/profile.component";
import { NewpostComponent } from "app/dashboard/manageposts/newpost/newpost.component";
import { ListhouseComponent } from "app/dashboard/manageposts/listhouse/listhouse.component";
import { DetailhouseComponent } from "app/dashboard/manageposts/detailhouse/detailhouse.component";
import { EdithouseComponent } from "app/dashboard/manageposts/edithouse/edithouse.component";
import { CreateroomtypeComponent } from "app/dashboard/managerooms/createroomtype/createroomtype.component";
import { RoomsComponent } from "app/dashboard/managerooms/rooms/rooms.component";
import { DetailroomComponent } from "app/dashboard/managerooms/detailroom/detailroom.component";

const appRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
  },
  { path: '', component: LoginComponent },
  // {
  //   path: 'dashboard', component: DashboardModule,
  //   children: [
  //     { path: 'infolandlord/profile/:id', component: ProfileComponent },
  //     { path: 'infolandlord/changepass', component: ChangepassComponent },
  //     { path: 'manageposts/newpost', component: NewpostComponent },
  //     { path: 'manageposts/listhouse', component: ListhouseComponent },
  //     { path: 'manageposts/detailhouse/:id', component: DetailhouseComponent },
  //     { path: 'manageposts/edithouse/:id', component: EdithouseComponent },
  //     { path: 'managerooms/createroomtype', component: CreateroomtypeComponent },
  //     { path: 'managerooms/rooms', component: RoomsComponent },
  //     { path: 'managerooms/rooms/detail', component: DetailroomComponent },
  //   ]
  // },
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // NavbarModule,
    // FooterModule,
    // SidebarModule,
    RouterModule.forRoot(appRoutes)
  ],

  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
