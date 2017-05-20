import { Component, OnInit } from '@angular/core';
import { ListhouseService } from './listhouse.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-listhouse',
  templateUrl: './listhouse.component.html',
  styleUrls: ['./listhouse.component.css'],
  providers: [ListhouseService]
})
export class ListhouseComponent implements OnInit {
  
  private router: Router;  private activatedRoute: ActivatedRoute;
  private houses: any[];
  constructor(private listhouseservice: ListhouseService) { }

  ngOnInit() {
    this.listhouseservice.GetList().subscribe((response: any) => {
      
      this.houses = response;
      console.log(response);

    }, error => {
      console.log(error);
    });
  }

  GoToEditHouse(id: object){
    console.log(id);
     this.router.navigate(['/manageposts/detailhouse/'+id]); 
  }

}
