import { Directive, Component, OnInit } from '@angular/core';
import initMaps = require('../../../../assets/js/init/initMaps.js');
import { Router, ActivatedRoute } from '@angular/router';
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

    constructor(
        private createroomtypeservice: CreateroomtypeService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.roomtype = {};
        this.LoadData();
        this.LoadDevice();
        console.log(this.showEdit);        
    }

    SaveAdd(f:NgForm) {
        
        var item=[];
        this.temp_arr.forEach(id => {
            item.push({'id_device': id});
        });
        
        var viewModel={
            title: f.value.title,
            description: f.value.description,
            no_people: f.value.no_people,
            no_room: 0,
            status: false,
            device:item
            
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
        });
        this.temp_arr = [];
        this.LoadDevice();
        

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

            this.roomtypes = response;
            console.log(response);

        }, error => {
            console.log(error);
        });
    }

    SaveUpdate(id: object) {
        this.createroomtypeservice.Update(id, this.roomtype).subscribe(response => {
            if (response) {
                initNotifySuccess('Update success!', 'success');
                this.LoadData();
            }
        })
        this.showEdit = false;
        this.roomtype = {};

    }

    EditFunction(id: object) {
        this.showEdit = true;
        this.createroomtypeservice.GetSingle(id).subscribe((response) => {
            console.log(Response);
            this.roomtype = response;
        })   
    }

    LoadDevice() {
        this.createroomtypeservice.GetListDevice().subscribe((response: any) => {

            this.devices = response;
            //console.log(response);

        }, error => {
            //console.log(error);
        });
    }

    // get selectedOptions() {
    //     return this.roomtype.filter(opt => opt.checked = 'True').map(opt => opt.value)
    // }

    pushdevice(id: object) {
        var index = this.temp_arr.indexOf( id );
        //console.log(index);
        if (index != -1) {
            //console.log(this.temp_arr.indexOf(id));
            this.temp_arr.splice(index,1);
        }
        else {
            this.temp_arr.push(id);
        }
        //console.log(this.temp_arr);
    }

    // trackDevice(index, itemDevice){
    //     console.log(itemDevice);
    //     // var abc=this.devices.filter(dvc => (dvc.id == itemDevice.id_device) ).map(dvc => dvc.name)
    //     // console.log(abc);
    //     console.log(this.devices);
    //     var abc = this.devices.indexOf( itemDevice.id_device) ;
    //     console.log(abc);
    //     // if (abc != -1) {
    //     //     //console.log(this.temp_arr.indexOf(id));
    //     //     JSON.stringify(this.devices.filter(dvc => dvc.id === itemDevice.id ).map(dvc => dvc.name))
            
    //     // }
    // }//bo


}
