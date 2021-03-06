import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar-routes.config';
import { MenuType } from '../.././sidebar/sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthenticationService } from '../../Auth/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthenticationService]
})
export class NavbarComponent implements OnInit {

  private listTitles: any[];
  location: Location;
  constructor(
    location: Location,
    private authenticationService: AuthenticationService
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle.menuType !== MenuType.BRAND);
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(2);
    }
    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
  getPath() {
    //console.log(this.location);
    return this.location.prepareExternalUrl(this.location.path());
  }

  logout() {
    this.authenticationService.logout();
  }

}
