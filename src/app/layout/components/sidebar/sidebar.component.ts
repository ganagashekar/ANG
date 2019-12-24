import { Component, OnInit } from '@angular/core';
import { NavItem } from '../../../shared/Common/NavItem';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    public showMenu: string;

      roleName = localStorage.getItem('RoleName');
     IsAdmin = (this.roleName === 'Admin' ? true : false);

     navItems: NavItem[] =  [
      {
        displayName: 'Dashboard',
        iconName: 'home',
        route: 'dashboard',
        visible: true ,

      },
      {
        displayName: 'Reports',
        iconName: 'assessment',
        visible: true ,
        children: [
          {
            displayName: 'Average',
            iconName: 'timeline',
            route: 'AverageReport',
            visible: true ,
          },
          {
            displayName: 'RealTime',
            iconName: 'library_books',
            route: 'RealtimeReport',
            visible: true ,
          },
          {
            displayName: 'Exceedence',
            iconName: 'multiline_chart',
            route: 'ExceedenceReport',
            visible: true ,
          },
          {
            displayName: 'Delayed',
            iconName: 'query_builder',

            route: 'AverageReport',
            visible: true ,

          }

        ]
      },

      {
        displayName: 'Setups',
        iconName: 'settings_applications',
        visible: this.IsAdmin ,
        children: [
          {
            displayName: 'Site',
            iconName: 'settings_input_composite',
            route: 'SiteSetup',
           visible: this.IsAdmin ,

          },
          {
            displayName: 'Controller',
            iconName: 'settings_input_composite',
            route: 'Controllersetup',
           visible: this.IsAdmin ,

          },
          {
            displayName: 'Controller-Bus',
            iconName: 'settings_input_composite',
            route: 'ControllerBusSetup',
           visible: this.IsAdmin ,

          },
          {
            displayName: 'Config',
            iconName: 'settings_system_daydream',
            route: 'Confg',
           visible: this.IsAdmin ,

          },
          {
            displayName: 'Parameter',
            iconName: 'settings_input_component',
            route: 'Paramsetup',
           visible: this.IsAdmin ,

          },
          {
            displayName: 'CalibrationSetup',
            iconName: 'settings_input_component',
            route: 'Calibration',
           visible: this.IsAdmin ,

          },
          {
            displayName: 'Calibration',
            iconName: 'settings_input_component',
            route: 'Calib',
            visible: (this.roleName === 'Admin' ? true : false) ,

          },
          {
            displayName: 'Calibration Report',
            iconName: 'settings_input_component',
            route: 'Calibrationreport',
            visible: (this.roleName === 'Admin' ? true : false) ,

          }

        ]
      },
      {
        displayName: 'UserSetup',
        iconName: 'settings_applications',
       visible: this.IsAdmin ,
        children: [
          {
            displayName: 'Users',
            iconName: 'people',
            route: 'Userinfosetup',
           visible: this.IsAdmin ,

          },
        ]
      },
      {
        displayName: 'Logs',
        iconName: 'settings_applications',
        visible: true,
        children: [
          {
            displayName: 'ApplicationLogs',
            iconName: 'Logs',
            route: 'ApplicationLogs',
            visible: true ,

          },
          {
            displayName: 'Audit',
            iconName: 'Audit',
            route: 'audit',
            visible: true ,

          },
          {
            displayName: 'Error-Code',
            iconName: 'error',
            route: 'Error',
           visible: this.IsAdmin ,

          }
        ]
      },
      {
        displayName: 'Live Status',
        iconName: 'settings_applications',
        visible: true,
        children: [
          {
            displayName: 'Camera Status',
            iconName: 'camera_enhance',
            route: 'Camera',
            visible: true ,

          },
        ]
      }
      // {
      //   displayName: 'Maleficent',
      //   disabled: true,
      //   iconName: 'report_problem',
      //   children: [
      //     {
      //       displayName: 'Speakers',
      //       iconName: 'group',
      //       children: [
      //         {
      //           displayName: 'Michael Prentice',
      //           iconName: 'person',
      //           route: 'michael-prentice',
      //           children: [
      //             {
      //               displayName: 'Create Enterprise UIs',
      //               iconName: 'star_rate',
      //               route: 'material-design'
      //             }
      //           ]
      //         },
      //         {
      //           displayName: 'Stephen Fluin',
      //           iconName: 'person',
      //           route: 'stephen-fluin',
      //           children: [
      //             {
      //               displayName: 'What\'s up with the Web?',
      //               iconName: 'star_rate',
      //               route: 'what-up-web'
      //             }
      //           ]
      //         },
      //         {
      //           displayName: 'Mike Brocchi',
      //           iconName: 'person',
      //           route: 'mike-brocchi',
      //           children: [
      //             {
      //               displayName: 'My ally, the CLI',
      //               iconName: 'star_rate',
      //               route: 'my-ally-cli'
      //             },
      //             {
      //               displayName: 'Become an Angular Tailor',
      //               iconName: 'star_rate',
      //               route: 'become-angular-tailer'
      //             }
      //           ]
      //         }
      //       ]
      //     },
      //     {
      //       displayName: 'Sessions',
      //       iconName: 'speaker_notes',
      //       children: [
      //         {
      //           displayName: 'Create Enterprise UIs',
      //           iconName: 'star_rate',
      //           route: 'material-design'
      //         },
      //         {
      //           displayName: 'What\'s up with the Web?',
      //           iconName: 'star_rate',
      //           route: 'what-up-web'
      //         },
      //         {
      //           displayName: 'My ally, the CLI',
      //           iconName: 'star_rate',
      //           route: 'my-ally-cli'
      //         },
      //         {
      //           displayName: 'Become an Angular Tailor',
      //           iconName: 'star_rate',
      //           route: 'become-angular-tailer'
      //         }
      //       ]
      //     },
      //     {
      //       displayName: 'Feedback',
      //       iconName: 'feedback',
      //       route: 'feedback'
      //     }
      //   ]
      // }
    ];
    constructor() {}

    ngOnInit() {
        this.showMenu = '';
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
}
