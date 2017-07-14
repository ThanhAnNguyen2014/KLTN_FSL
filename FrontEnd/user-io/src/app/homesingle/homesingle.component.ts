import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SharedserviceService } from '../shared-service/sharedservice.service';
import { Subscription } from 'rxjs/Subscription';
declare var $: any;

@Component({
  selector: 'app-homesingle',
  templateUrl: './homesingle.component.html',
  styleUrls: ['./homesingle.component.css']
})
export class HomesingleComponent implements OnInit, AfterViewInit, OnDestroy {
  message: any;
  subscription: Subscription;

  constructor(private shareService: SharedserviceService) { }

  ngOnInit() {

    
    $.getScript('../../../assets/js/app.js');
    setTimeout(() => {
      $('body').addClass('no-hidden');
    }, 0)
  }
  ngAfterViewInit() {

  }
  ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
      
    }

}
