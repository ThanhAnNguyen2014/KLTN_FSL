import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers:[ContactService]
})
export class ContactComponent implements OnInit {
  @Input() idlandlord;
  public info: any;
  constructor(
    private contactsevice: ContactService
  ) { }

  ngOnInit() {
  }
  getInfoLandlord() {
    this.contactsevice.getInfo(this.idlandlord).subscribe((res) => {
      if(res.message){
        console.log(res.message);
      }
      else{
        this.info= res.doc;
      }
    })
  }

}
