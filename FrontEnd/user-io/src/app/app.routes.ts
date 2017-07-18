import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';

import { HomesingleComponent } from "./homesingle/homesingle.component";
import { DetailsComponent } from "./details/details.component";

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'details', component: DetailsComponent },
  { path: '', component: HomesingleComponent }
]
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);