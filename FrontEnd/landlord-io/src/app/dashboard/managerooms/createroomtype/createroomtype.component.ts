import { Component, OnInit } from '@angular/core';
import initMaps = require('../../../../assets/js/init/initMaps.js');
import { Router, ActivatedRoute } from '@angular/router';
import initNotifySuccess = require('../../../../assets/js/init/notify-success.js');
import { CreateroomtypeService } from './createroomtype.service';
declare var $: any;

@Component({
    selector: 'app-createroomtype',
    templateUrl: './createroomtype.component.html',
    styleUrls: ['./createroomtype.component.css'],
    providers: [CreateroomtypeService]
})
export class CreateroomtypeComponent implements OnInit {

    //private _id: object;
    private room: any;
    private rooms: any[];
    showEdit: boolean = false;

    constructor(
        private createroomtypeservice: CreateroomtypeService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.room = {};
        this.LoadData();
    }

    SaveAdd() {
        this.room.no_room = 0;
        this.createroomtypeservice.Add(this.room).subscribe(res => {
            console.log(this.room);
            if (res) {
                initNotifySuccess('Add success','success');
                //alert('add success');
                console.log(res);
                //this.router.navigate(['/managerooms/createroomtype']);
                this.LoadData();
                this.room = {};

            }
        })

    }
    Delete(id: object) {
        let confirmResult = confirm("Are you sure to delete Room type?");
        if (confirmResult) {
            this.createroomtypeservice.Delete(id).subscribe(response => {
                if (response) {
                    alert('Delete ok');
                    this.LoadData();

                }
            })
        }
    }

    LoadData() {
        this.createroomtypeservice.GetList().subscribe((response: any) => {

            this.rooms = response;
            console.log(response);

        }, error => {
            console.log(error);
        });
    }

    SaveUpdate(id: object) {
        this.createroomtypeservice.Update(id, this.room).subscribe(response => {
            if (response) {
                alert('Update success!');
            }
        })
        this.showEdit = false;
        this.LoadData();
    }

    EditFunction(id: object) {
        //this.flagEdit=1;
        this.showEdit = true;
        this.createroomtypeservice.GetSingle(id).subscribe((response) => {
            this.room = response;
        })
    }

}
