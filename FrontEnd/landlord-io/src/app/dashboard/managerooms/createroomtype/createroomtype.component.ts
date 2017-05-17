import { Component, OnInit } from '@angular/core';
import initMaps = require('../../../../assets/js/init/initMaps.js');
import { Router, ActivatedRoute } from '@angular/router';
import initNotifyAddSuccess = require('../../../../assets/js/init/notify-add-success.js');
import { CreateroomtypeService } from './createroomtype.service';
declare var $: any;

@Component({
    selector: 'app-createroomtype',
    templateUrl: './createroomtype.component.html',
    styleUrls: ['./createroomtype.component.css'],
    providers: [CreateroomtypeService]
})
export class CreateroomtypeComponent implements OnInit {

    private _id: object;
    private room: any;
    private rooms: any[];
    constructor(
        private createroomtypeservice: CreateroomtypeService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.room = {};
        this.createroomtypeservice.GetList().subscribe((response: any) => {

            this.rooms = response;
            console.log(response);

        }, error => {
            console.log(error);
        });
    }

    Save() {
        this.createroomtypeservice.Add(this.room).subscribe(res => {
            if (res) {
                initNotifyAddSuccess(); 
                //alert('add success');
                console.log(res);
                this.router.navigate(['/managerooms/createroomtype']);   
            }
        })

    }

}
