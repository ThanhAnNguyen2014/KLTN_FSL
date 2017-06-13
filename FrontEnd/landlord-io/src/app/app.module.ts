import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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

/**Import component and module of firebase */
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyBdgpxShqNc5-cwvu9MPYk0b4ejHpSNnKY",
  authDomain: "fsl-io.firebaseapp.com",
  databaseURL: "https://fsl-io.firebaseio.com",
  projectId: "fsl-io",
  storageBucket: "fsl-io.appspot.com",
  messagingSenderId: "108922144834"
};

const appRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
  },
  { path: '', component: LoginComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],

  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }


