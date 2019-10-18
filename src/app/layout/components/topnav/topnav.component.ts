import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { SetupsService } from 'src/app/shared/services/Setups.service';
import { AppComponent } from 'src/app/app.component';

@Component({
    selector: 'app-topnav',
    templateUrl: './topnav.component.html',
    styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
    public pushRightClass: string;
    SiteId: number;
    sitesArray: ReferenceRecords[] = [];
 loggedusername: string;

 constructor( private _appcomponent: AppComponent, public router: Router,
  private _setupsservices: SetupsService, private translate: TranslateService) {
  _appcomponent.currenturl = '/taskSchedulerList';
  this.router.events.subscribe(val => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
}

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.loggedusername = localStorage.getItem('userName');
        this. getSites();
        this.SiteId = 1;
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

    changeLang(language: string) {
        this.translate.use(language);
    }
}
