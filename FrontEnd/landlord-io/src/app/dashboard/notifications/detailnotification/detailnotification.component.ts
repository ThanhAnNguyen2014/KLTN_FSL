import { Component, OnInit } from '@angular/core';
import { DetailnotiserviceService } from './detailnotiservice.service';
import { Router, ActivatedRoute } from "@angular/router";
declare var swal: any;
@Component({
  selector: 'app-detailnotification',
  templateUrl: './detailnotification.component.html',
  styleUrls: ['./detailnotification.component.css'],
  providers: [DetailnotiserviceService]
})
export class DetailnotificationComponent implements OnInit {

  public id;
  public detailNoti: any;
  constructor(private detailService: DetailnotiserviceService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getDetailNotiById(this.id);
  }
  getDetailNotiById(id) {
    this.detailService.findDetailNotiById(id).subscribe(res => {
      this.detailNoti = res.doc;
      console.log(this.detailNoti);
    }, err => {
      console.log(err);
    });
  }
  showAlert() {
    var that = this;
    swal({
      title: 'Bạn có đồng ý',
      text: 'User này được đặt phòng trước',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Không đồng ý',
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      buttonsStyling: false
    }).then(function () {
      console.log('thuc thi lenh');
      that.detailService.acceptRentRoom(that.id).subscribe(res => {
        console.log(res);
        console.log('--- Chấp thành công');

      }, err => {
        console.log(err);
      })
      swal({
        title: 'Chấp nhận đặt phòng thành công!',
        text: 'Bạn hãy liên hệ User sớm nhất thông qua email được cung cấp',
        type: 'success',
        confirmButtonClass: "btn btn-success",
        buttonsStyling: false
      }).then(function () {
        that.router.navigate(['/dashboard/notifications']);
      })

    }, function (dismiss) {
      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      if (dismiss === 'cancel') {
        that.detailService.notAcceptRentRoom(that.id).subscribe(res => {
          console.log(res);
          console.log('-- xoa thanh cong và chuyen trang');
        }, err => { console.log(err); })
        swal({
          title: 'Hủy bỏ thông báo!',
          text: 'Hủy bỏ thông báo thành công',
          type: 'error',
          confirmButtonClass: "btn btn-info",
          buttonsStyling: false
        }).then(function () {
          that.router.navigate(['/dashboard/notifications']);
        })
      }
    })
  }
}
