import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';

import { DetailsComponent } from './details.component';
import { SearchdetailsComponent } from './searchdetails/searchdetails.component';
import { HeaderComponent } from './shared/header/header.component';
import { LeftsideComponent } from './shared/leftside/leftside.component';
import { DetailhouseComponent } from './detailhouse/detailhouse.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';


const routes: Routes = [
  { path: '', redirectTo: 'details', pathMatch: 'full' },
  {
    path: 'details', component: DetailsComponent,
    children: [
      { path: 'search-details', component: SearchdetailsComponent },
      { path: 'detail-house/:id', component: DetailhouseComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'edit-profile', component: EditprofileComponent }

    ]
  },

]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);