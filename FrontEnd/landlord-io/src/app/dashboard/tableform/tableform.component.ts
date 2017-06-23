import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-tableform',
  templateUrl: './tableform.component.html',
  styleUrls: ['./tableform.component.css']
})
export class TableformComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  constructor() { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

}
