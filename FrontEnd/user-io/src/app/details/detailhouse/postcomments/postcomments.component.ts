import { Component, OnInit, ViewChild, ViewContainerRef, Output, EventEmitter, OnChanges, SimpleChanges, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../Auth/services/authentication.service';
import { HeaderService } from '../../shared/header/header.service';
import { PostcommentsService } from './postcomments.service';


@Component({
  selector: 'app-postcomments',
  templateUrl: './postcomments.component.html',
  styleUrls: ['./postcomments.component.css'],
  providers: [HeaderService, PostcommentsService]

})
export class PostcommentsComponent implements OnInit {

  @Output() myCommentPost = new EventEmitter();
  public image;
  public id_house;
  public comment;
  constructor(private auth: AuthenticationService,
    private header: HeaderService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private postCommnetService: PostcommentsService) { }

  ngOnInit() {
    this.activatedroute.params.subscribe(params => {
      this.id_house = params['id'];
    });
    if (localStorage.getItem('currentUser')) {
      this.header.getInfo().subscribe((res) => {
        this.image = res.doc.image;
      });
    }
  }
  OnSubmit(f: NgForm) {
    if (f.value.comment != undefined) {
      f.value.id_house = this.id_house;
      this.postCommnetService.postComment(f.value).subscribe((res) => {
        this.myCommentPost.emit(null);
        this.comment = '';
      });
    }
  }
  getInfoFromDetail() {
    this.postCommnetService.getInfoUser().subscribe(res => {
      this.image = res.doc.image;
    })
  }



}
