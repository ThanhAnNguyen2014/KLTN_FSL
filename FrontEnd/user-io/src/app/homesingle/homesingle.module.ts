import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { HomesingleComponent } from './homesingle.component';
import { SliderComponent } from './slider/slider.component';
import { FooterComponent } from './footer/footer.component';
import { SuportservicComponent } from './content/suportservic/suportservic.component';
import { NewhomeComponent } from './content/newhome/newhome.component';
import { ContentComponent } from './content/content.component';
import { RatlandlordComponent } from './content/ratlandlord/ratlandlord.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomesingleComponent },

]

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    HomesingleComponent,
    SliderComponent,
    FooterComponent,
    SuportservicComponent,
    NewhomeComponent,
    ContentComponent,
    RatlandlordComponent
  ],
  exports:[HomesingleComponent]
})
export class HomesingleModule { }
