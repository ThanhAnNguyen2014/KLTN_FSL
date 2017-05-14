import { Component, OnInit } from '@angular/core';
import {ROUTES} from './sidebar-routes.config';
import {MenuType} from './sidebar.metadata';

declare var $:any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public menuItems:any[];
  constructor() { }

  ngOnInit() {
    $.getScript('../../assets/js/sidebar-moving-tab.js');
    this.menuItems=ROUTES.filter(menuItem=>menuItem.menuType!==MenuType.BRAND);
  };

}
