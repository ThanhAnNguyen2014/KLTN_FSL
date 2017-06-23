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
    //AuthModule,
    HomesingleModule,
    DetailsModule,
    routing
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
