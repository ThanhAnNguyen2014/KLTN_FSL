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



  listhomehouses: NewHouse[];
  sub: Subscription;
  constructor(private newhomeService: NewhomeService) {


    newhomeService.getSixHouses().subscribe(
      data => {
        this.listhomehouses = data
      },
      (error) => { console.log('Error server! ... ' + error) },
      () => console.log('completed!')
    );

  }

  ratings(value) {
    //var temp = parseInt(value);
    //console.log(temp);

    var a = [];
    if (value == 0) {
      return a;
    };
    for (var i = 0; i < parseInt(value); ++i) {
      a.push(i + 1)
    }
    return a;
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
