import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NguiTooltipModule } from '@ngui/tooltip';
import { StarRatingModule } from 'angular-star-rating';
import { FormsModule } from '@angular/forms';


import { HomesingleComponent } from './homesingle.component';
import { SliderComponent } from './slider/slider.component';
import { FooterComponent } from './footer/footer.component';
import { SuportservicComponent } from './content/suportservic/suportservic.component';
import { NewhomeComponent } from './content/newhome/newhome.component';
import { ContentComponent } from './content/content.component';
import { RatlandlordComponent } from './content/ratlandlord/ratlandlord.component';


import { routing } from './homsingle.routes';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ActionComponent } from './action/action.component';

import { SharedserviceService } from '../shared-service/sharedservice.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomesingleComponent },

]

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    StarRatingModule,
    //NguiTooltipModule,
    routing
  ],
  declarations: [
    HomesingleComponent,
    SliderComponent,
    FooterComponent,
    SuportservicComponent,
    NewhomeComponent,
    ContentComponent,
    RatlandlordComponent,
    SigninComponent,
    SignupComponent,
    ActionComponent
  ],
  providers: [SharedserviceService],
  exports: [HomesingleComponent]
})
export class HomesingleModule { }
