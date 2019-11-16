import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loginresponse } from '../Model/Account/UserModel';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {


  userdetails: Loginresponse;
  siteName: string ;
  Sitecity: string ;

constructor(private router: Router, ) {
  const navigation = this.router.getCurrentNavigation();
  if (navigation.extras.state !== undefined) {
    this.userdetails = navigation.extras.state  as Loginresponse;

    // this.siteName = this.userdetails.model.site.siteName;
    // this.Sitecity = this.userdetails.model.site.site_city;
  }
}


    ngOnInit() {}


}
