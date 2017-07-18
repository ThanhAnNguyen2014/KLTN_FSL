import { Component } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { SharedserviceService } from "./shared-service/sharedservice.service";


declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor() { };

}
