import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NoticationserviceService } from './notiicationservice.service';
declare var $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [NoticationserviceService]
})
export class NotificationsComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    
  }

  oldNotify: any;
  newNotify: any;
  constructor(private notifyService: NoticationserviceService) { }

  ngOnInit() {
    this.loadNotifyNew();
    this.loadNotifyOld();

  }
  loadNotifyNew() {
    this.notifyService.getNotifyNew().subscribe(res => {
      this.newNotify = res;
      
    },
      err => {
        console.log(err);
      })
  }
  loadNotifyOld() {
    this.notifyService.getNotifyOld().subscribe(res => {
      this.oldNotify = res;
      $.getScript('../../../assets/js/init/initDataTable.js');
    },
      err => {
        console.log(err);
      })
  }
}
