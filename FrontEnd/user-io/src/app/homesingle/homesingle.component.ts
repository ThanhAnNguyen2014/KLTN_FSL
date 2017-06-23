import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-homesingle',
  templateUrl: './homesingle.component.html',
  styleUrls: ['./homesingle.component.css']
})
export class HomesingleComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
    $.getScript('../../../assets/js/app.js');
  }
  ngAfterViewInit(){
    
  }

}
