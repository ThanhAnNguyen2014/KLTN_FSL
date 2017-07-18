import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-homesingle',
  templateUrl: './homesingle.component.html',
  styleUrls: ['./homesingle.component.css']
})
export class HomesingleComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor() { }

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
