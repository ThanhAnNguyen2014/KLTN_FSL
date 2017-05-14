import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from './navbar.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule, CommonModule
  ],
  declarations: [NavbarComponent],
  exports:[NavbarComponent]
})
export class NavbarModule { }
