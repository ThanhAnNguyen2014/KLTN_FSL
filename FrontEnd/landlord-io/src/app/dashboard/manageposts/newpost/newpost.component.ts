import { Component, OnInit } from '@angular/core';
import initMaps = require('../../../../assets/js/init/initMaps.js');
import { NewpostService } from './newpost.service';
import { Router, ActivatedRoute } from '@angular/router';
import initNotifyAddSuccess = require('../../../../assets/js/init/notify-add-success.js');
declare var $: any;

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css'],
  providers:[NewpostService]
})
export class NewpostComponent implements OnInit {

  private _id: object;
  private house: any;

  constructor(
    private router: Router, private activatedRoute: ActivatedRoute,
    private newpostService: NewpostService
  ) { }

  ngOnInit() {
    initMaps();
    this.house={};
  }

   SaveForm() {
        this.newpostService.Add(this.house).subscribe(response => {

            if (response) {
                initNotifyAddSuccess(); 
                //alert('add success');
                console.log(response);
                this.router.navigate(['/manageposts/listhouse']);   
            }
        })
        
    }

}
