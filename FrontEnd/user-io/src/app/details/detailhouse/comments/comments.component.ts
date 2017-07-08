import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from './comments.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  providers: [CommentsService]
})
export class CommentsComponent implements OnInit {
  public id;
  public comments;
  public totalComments;
  public checkLogin = JSON.parse(localStorage.getItem('currentUser'));
  constructor(
    private commentSevice: CommentsService,
    private router: Router,
    private activatedroute: ActivatedRoute, ) { }

  ngOnInit() {
    this.activatedroute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getAllCommentByIdHouse();
  }
  getAllCommentByIdHouse() {
    this.commentSevice.getComments(this.id).subscribe((res) => {
      this.comments = res.doc;
      this.totalComments = this.comments.length;
    })
  }
  isActive(comment) {
    if (this.checkLogin) {
      return comment.id_user.username === this.checkLogin.username;
    }
  }
  deleteComment(id) {
    this.commentSevice.removeComment(id).subscribe((res) => {
      this.getAllCommentByIdHouse();
    });
  }

}
