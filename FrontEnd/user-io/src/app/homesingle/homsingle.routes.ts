import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';

import { HomesingleComponent } from './homesingle.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomesingleComponent },

]
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);