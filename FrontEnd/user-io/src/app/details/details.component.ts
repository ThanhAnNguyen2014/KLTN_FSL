import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { SharedserviceService } from '../shared-service/sharedservice.service';

declare var $: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  sub:Subscription;

  constructor(private shareService: SharedserviceService) {
    this.sub= shareService.getInfoUser().subscribe(res=>{
      if(res!==null){
        this.ngOnInit();
      }
    }, err=>{
      console.log(err);
    });
  }

  ngOnInit() {
    // $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBesDGtkcvFGS4KVDJpAl7bDBeSWroWh3I&v=3');
    $.getScript('../../../assets/js/infobox.js');
    $.getScript('../../../assets/js/app.js');
    setTimeout(() => {
      $('body').removeClass('no-hidden');
    }, 0)
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
