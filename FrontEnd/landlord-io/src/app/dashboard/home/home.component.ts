import { Component, OnInit } from '@angular/core';
import initVectorMap = require('../../../assets/js/init/initVectorMap.js');
import initCharts = require('../../../assets/js/init/charts.js');
import initAniCharts = require('../../../assets/js/init/initAniCharts.js');
import initTooltips = require('../../../assets/js/init/initTooltips.js');
import initNotify = require('../../../assets/js/init/notify.js');
import { NotifyserviceService } from '../../shared-services/notifyservice.service';
import { HomeService } from './home.service';
import * as io from 'socket.io-client';
declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [HomeService]
})
export class HomeComponent implements OnInit {
    public socket;
    public notifynew;
    constructor(private notifyService: NotifyserviceService, private homeService: HomeService) { }

    ngOnInit() {
        $.getScript('../assets/js/init/initMenu.js');
        //initVectorMap(),
        initAniCharts(),
            initTooltips(),
            initNotify()
        this.getTenNotifyNew();
        this.socket = io('http://localhost:4000');
        this.socket.on('new-notify', (data) => {
            console.log(data);
            this.notifyService.getTenNotifyNew().then(res => {
                console.log(res);
                this.notifynew = res;
            }, err => {
                console.log(err);
            });
        });
    }
    getTenNotifyNew() {
        this.homeService.getTenNotifyNewConstructor().subscribe(res => {
            this.notifynew = res;
        }, err => {
            console.log(err);
        })
    }

}
