import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewhomeService } from "./newhome.service";
import { NewHouse } from "./newhouse";
import { Subscription } from "rxjs/Rx";
import { NgClass } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-newhome',
  templateUrl: './newhome.component.html',
  styleUrls: ['./newhome.component.css'],
  providers: [NewhomeService]
})
export class NewhomeComponent implements OnInit, OnDestroy {


  status: boolean= false;
  listhomehouses: NewHouse[];
  sub: Subscription;
  constructor(private newhomeService: NewhomeService) {


    newhomeService.getSixHouses().subscribe(
      data => {
        this.status = true;
        this.listhomehouses = data;
      },
      (error) => { console.log('Error server! ... ' + error) },
      () => console.log('completed!')
    );

  }
  ngOnInit() {
    //$('[data-toggle="tooltip"]').tooltip();
    //$.getScript('../../../../assets/js/tooltip.js');
  }
  ngOnDestroy(): void {
    //this.sub.unsubscribe(); // 
    // console.log('Unsbscription complete!');
  }

}
