import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
//import { NguiTooltipModule } from '@ngui/tooltip';
//import { StarRatingModule } from 'angular-star-rating';
=======
import { NguiTooltipModule } from '@ngui/tooltip';
import { StarRatingModule } from 'angular-star-rating';
import { FormsModule } from '@angular/forms';
>>>>>>> a2ba54efc32cfcc6a1396e4ac890c2e0143764c7


import { HomesingleComponent } from './homesingle.component';
import { SliderComponent } from './slider/slider.component';
import { FooterComponent } from './footer/footer.component';
import { SuportservicComponent } from './content/suportservic/suportservic.component';
import { NewhomeComponent } from './content/newhome/newhome.component';
import { ContentComponent } from './content/content.component';
import { RatlandlordComponent } from './content/ratlandlord/ratlandlord.component';


import {routing} from './homsingle.routes';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ActionComponent } from './action/action.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomesingleComponent },

]

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
<<<<<<< HEAD
    //StarRatingModule,
=======
    FormsModule,
    StarRatingModule,
>>>>>>> a2ba54efc32cfcc6a1396e4ac890c2e0143764c7
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
  exports:[HomesingleComponent]
})
export class HomesingleModule { }
