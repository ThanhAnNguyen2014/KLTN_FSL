import { Component, OnInit } from '@angular/core';
import { ListhouseService } from './listhouse.service';
import { Router, ActivatedRoute } from "@angular/router";
//import demo= require('../../../../assets/js/demo.js');

@Component({
  selector: 'app-listhouse',
  templateUrl: './listhouse.component.html',
  styleUrls: ['./listhouse.component.css'],
  providers: [ListhouseService]
})
export class ListhouseComponent implements OnInit {

  private router: Router; private activatedRoute: ActivatedRoute;
  private houses: any[];
  constructor(private listhouseservice: ListhouseService) { }

  ngOnInit() {
    this.LoadData();
  }

  LoadData() {
    this.listhouseservice.GetList().subscribe((response: any) => {
      this.houses = response;
      console.log(this.houses);
    }, error => {
      console.log(error);
    });
  }

  Delete(id: object) {
    //demo();
    //demo.showSwal('warning-message-and-confirmation');
    let confirmResult = confirm("Are you sure to delete House?");
    if (confirmResult) {
      this.listhouseservice.Delete(id).subscribe((response: any) => {
        console.log(response);
        if (response) {
          //alert('Delete ok');
          //demo.showSwal('warning-message-and-confirmation');
          //$.getScript('../../../../assets/js/demo.js').showSwal('warning-message-and-confirmation');
          this.LoadData();
        }
      }, error => {
        console.log(error);
      });
    }

  }


}
