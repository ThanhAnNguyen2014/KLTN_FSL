import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IStarRatingOnClickEvent, IStarRatingOnRatingChangeEven } from "angular-star-rating/src/star-rating-struct";
import { RateHouseService } from './rate-house.service';

declare var $: any;
@Component({
  selector: 'app-rate-house',
  templateUrl: './rate-house.component.html',
  styleUrls: ['./rate-house.component.css'],
  providers: [RateHouseService]
})
export class RateHouseComponent implements OnInit {
  public id;
  private rate: number;
  private labeltext: string;
  onRatingChangeResult: IStarRatingOnRatingChangeEven;
  private message: string;
  constructor(
    private rateSevice: RateHouseService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.activatedroute.params.subscribe(params => {
      this.id = params['id'];
      this.rate = 4;
    });
  }

  onRatingChange = ($event: IStarRatingOnRatingChangeEven) => {
    this.onRatingChangeResult = $event;
    if (this.onRatingChangeResult.rating == 1) {
      this.labeltext = 'Rất tệ'
    }
    if (this.onRatingChangeResult.rating == 2) {
      this.labeltext = 'Tệ'
    }
    if (this.onRatingChangeResult.rating == 3) {
      this.labeltext = 'Trung bình'
    }
    if (this.onRatingChangeResult.rating == 4) {
      this.labeltext = 'Tốt'
    }
    if (this.onRatingChangeResult.rating == 5) {
      this.labeltext = 'Rất tốt'
    }
  };
  OnSubmit(f: NgForm) {
    f.value.rate = this.onRatingChangeResult.rating;
    f.value.id_house = this.id;
    console.log(f.value);
    this.rateSevice.postRating(f.value).subscribe((res) => {
      if (res.doc.status) {
        this.message = 'Cảm ơn bạn đã đánh giá thông tin chúng tôi cung cấp'
        this.rate = 4;
      }
      else {
        this.message = 'Bạn chỉ được đánh giá một lần!'
      }
      //$('#ratingForm').modal('hide');
    })
  }
}
