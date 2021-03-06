import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ReferenceRecords } from '../../../Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { SetupsService } from '../../../shared/services/Setups.service';
import { AppComponent } from '../../../app.component';
import { Loginresponse } from '../../../Model/Account/UserModel';

@Component({
    selector: 'app-topnav',
    templateUrl: './topnav.component.html',
    styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
    public pushRightClass: string;
    @Input() userdetails: Loginresponse;
    SiteId: number;
    SiteName: string;
    SiteCity: string;
    sitesArray: ReferenceRecords[] = [];
 loggedusername: string;

 constructor( private _appcomponent: AppComponent, public router: Router,
  private _setupsservices: SetupsService, private translate: TranslateService) {
  // _appcomponent.currenturl = '/taskSchedulerList';
  this.router.events.subscribe(val => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
}

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.loggedusername = localStorage.getItem('RoleName');
        this.SiteId = Number(localStorage.getItem('SiteId'));
        this.SiteName = localStorage.getItem('SiteName');
        this.SiteCity = localStorage.getItem('SiteCity');
        // this.SiteName = this.userdetails.model.site.siteName; // this.sitesArray[0].name;
        // this.SiteCity = this.userdetails.model.site.site_city;
    }


    getSites(): void {
      this._setupsservices.getAllSites(0, false).subscribe(resp => {
        this.sitesArray = resp.model as ReferenceRecords[];
      }, error => {
        console.log('Error: ' + error);
      });
    }
    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
        this.router.navigate(['/login']);
    }

    RefreshCurrentPage(event) {
      this._appcomponent.SiteId = event.value;
      this.router.navigate([this._appcomponent.currenturl]);
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
