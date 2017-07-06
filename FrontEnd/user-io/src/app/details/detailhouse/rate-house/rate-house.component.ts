import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IStarRatingOnClickEvent, IStarRatingOnRatingChangeEven } from "angular-star-rating/src/star-rating-struct";
@Component({
  selector: 'app-rate-house',
  templateUrl: './rate-house.component.html',
  styleUrls: ['./rate-house.component.css'],
})
export class RateHouseComponent implements OnInit {

  private rate: number;
  private labeltext: string;
  onRatingChangeResult: IStarRatingOnRatingChangeEven;
  constructor() {
    this.rate = 4;
  }

  ngOnInit() {
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
    f.value.rating = this.onRatingChangeResult.rating;
    console.log(f.value);
  }
}
