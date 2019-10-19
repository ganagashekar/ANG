import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Monitoring App';
  currentYear: number;
  dialogRef;
  @Input() userName = '';
  @Input() currenturl = '';
  @Input() SiteId = 0;
  @Input() UserId = 0;

    constructor(private translate: TranslateService) {
        translate.setDefaultLang('en');
    }

    ngOnInit() {
      if (localStorage.getItem('userName') != null) {
        this.userName = localStorage.getItem('userName');
      } else {
        this.userName = '';
      }
    }
}
