import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';

import { HomesingleComponent } from "./homesingle/homesingle.component";
import { DetailsComponent } from "./details/details.component";

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomesingleComponent },
  { path: 'details', component: DetailsComponent }

]
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);