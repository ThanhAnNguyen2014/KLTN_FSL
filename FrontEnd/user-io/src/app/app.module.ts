import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routes';
//import {AuthModule} from './Auth/services/authentication.module';

import { AppComponent } from './app.component';
import { HomesingleComponent } from './homesingle/homesingle.component';
import { DetailsComponent } from './details/details.component';

import { HomesingleModule } from './homesingle/homesingle.module';
import { DetailsModule } from './details/details.module';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AuthGuard } from './Auth/guards/auth.guard';
import { AuthenticationService } from './Auth/services/authentication.service';
//import { AUTH_PROVIDERS } from 'angular2-jwt';
import { CustomFormsModule } from 'ng2-validation'
/**Import component and module of firebase */
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';

/**Import component and module of ng2-img-max fix size image*/
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { SharedserviceService } from './shared-service/sharedservice.service';

export const firebaseConfig = {
  apiKey: "AIzaSyBdgpxShqNc5-cwvu9MPYk0b4ejHpSNnKY",
  authDomain: "fsl-io.firebaseapp.com",
  databaseURL: "https://fsl-io.firebaseio.com",
  projectId: "fsl-io",
  storageBucket: "fsl-io.appspot.com",
  messagingSenderId: "108922144834"
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    HttpModule,
    HomesingleModule,
    DetailsModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    Ng2ImgMaxModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthGuard,
    AuthenticationService,
    SharedserviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
