import { Component, OnInit } from '@angular/core';
import initVectorMap = require('../../../assets/js/init/initVectorMap.js');
import initCharts = require('../../../assets/js/init/charts.js');
import initAniCharts = require('../../../assets/js/init/initAniCharts.js');
import initTooltips = require('../../../assets/js/init/initTooltips.js');
import initNotify = require('../../../assets/js/init/notify.js');
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $.getScript('../assets/js/init/initMenu.js');
    //initVectorMap(),
    initAniCharts(),
    initTooltips(),
    initNotify()
  }

}
