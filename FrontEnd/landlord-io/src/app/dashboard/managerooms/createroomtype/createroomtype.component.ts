import { Directive, Component, OnInit } from '@angular/core';
import initMaps = require('../../../../assets/js/init/initMaps.js');
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import initNotifySuccess = require('../../../../assets/js/init/notify-success.js');
import { CreateroomtypeService } from './createroomtype.service';
import { NgForm } from "@angular/forms";
declare var $: any;


@Component({
    selector: 'app-createroomtype',
    templateUrl: './createroomtype.component.html',
    styleUrls: ['./createroomtype.component.css'],

    providers: [CreateroomtypeService],

})
export class CreateroomtypeComponent implements OnInit {

    private roomtype: any;
    private roomtypes: any[];
    showEdit: boolean = false;
    private devices: any[];
    private temp_arr: any = [];
    private arr_device_roomtype: any[];

    constructor(
        private createroomtypeservice: CreateroomtypeService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        this.LoadDevice();
    }

    ngOnInit() {
        this.roomtype = {};
        this.LoadData();
    }


    SaveAdd(f: NgForm) {

        var item = [];
        console.log('Before saving new item');
        console.log(this.temp_arr);
        this.temp_arr.forEach(id => {
            item.push({ 'id_device': id.id });
        });

        var viewModel = {
            title: f.value.title,
            description: f.value.description,
            no_people: f.value.no_people,
            no_room: 0,
            status: false,
            device: item

        };
        this.createroomtypeservice.Add(viewModel).subscribe(res => {
            console.log(this.roomtype);
            if (res) {
                initNotifySuccess('Add success', 'success');
                //alert('add success');
                console.log(res);
                //this.router.navigate(['/managerooms/createroomtype']);
                this.LoadData();
                //this.room = {};

            }
            this.roomtype = {};
            this.temp_arr = [];
        })
        this.LoadDevice();
    }

    Delete(id: object) {
        let confirmResult = confirm("Are you sure to delete Room type?");
        if (confirmResult) {
            this.createroomtypeservice.GetSingle(id).subscribe((response) => {
                if (response.no_room == 0) {
                    this.createroomtypeservice.Delete(id).subscribe(response => {
                        if (response) {
                            alert('Delete ok');
                            this.LoadData();
                        }
                    }, error => {
                        console.log(error);
                    })
                }
                else
                    alert('This room type has value!');
            })

        }
    }

    LoadData() {
        this.createroomtypeservice.GetList().subscribe((response: any) => {
            this.roomtypes = response;
            console.log(response);
        }, error => {
            console.log(error);
        });
    }

    SaveUpdate(id: object) {
        var item = [];
        console.log(this.temp_arr);
        this.temp_arr.forEach(id => {
            item.push({ 'id_device': id.id });
        });
        console.log('item ne');
        console.log(item);
        this.roomtype.device = item;
        this.createroomtypeservice.Update(id, this.roomtype).subscribe(response => {
            if (response) {
                initNotifySuccess('Update success!', 'success');
                this.LoadData();
            }
        })
        this.showEdit = false;
        this.temp_arr = [];
        this.roomtype = {};

    }

    Cancel_update() {
        this.showEdit = false;
        this.roomtype = {};
    }

    EditFunction(id: object) {
        this.showEdit = true;
        this.createroomtypeservice.GetSingle(id).subscribe((response) => {
            this.roomtype = response;
            this.roomtype.device.map((device) => {
                this.temp_arr.push({ 'id': device.id_device });
            });
            this.roomtype.device.forEach(device => {
                this.temp_arr.push({ 'id': device.id_device });
            });
        })
    }

    LoadDevice() {
        this.createroomtypeservice.GetListDevice().subscribe((response: any) => {
            this.devices = response;
            //console.log(response);
        }, error => {
            console.log(error);
        });
    }

    pushdevice(id: object) {
        let index = -1;
        for (let i = 0; i < this.temp_arr.length; i++) {
            if (this.temp_arr[i].id == id) {
                index = i;
            }
        }
        if (index != -1) {
            this.temp_arr.splice(index, 1);
        }
        else {
            this.temp_arr.push({ 'id': id });
        }
    }

    itemExistInDeviceList(device: any): Boolean {
        if (this.roomtype.device) {
            for (let item of this.roomtype.device) {
                if (device._id === item.id_device) {
                    return true;
                }
            }
            return false;
        }
        return false;
    }
}
