import { Component, OnInit } from '@angular/core';
import { NavItem } from 'src/app/shared/Common/NavItem';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    public showMenu: string;


    navItems: NavItem[] =  [
      {
        displayName: 'Dashboard',
        iconName: 'home',
        route: 'dashboard',

      },
      {
        displayName: 'Reports',
        iconName: 'assessment',
        children: [
          {
            displayName: 'Average',
            iconName: 'timeline',
            route: 'AverageReport'

          },
          {
            displayName: 'Live Report',
            iconName: 'library_books',
            route: 'AverageReport'

          },
          {
            displayName: 'Exceedence',
            iconName: 'multiline_chart',
            route: 'AverageReport'

          },
          {
            displayName: 'Delayed',
            iconName: 'query_builder',

            route: 'AverageReport'

          }

        ]
      },

      {
        displayName: 'Setups',
        iconName: 'settings_applications',
        children: [
          {
            displayName: 'Parameter',
            iconName: 'settings_input_component',
            route: 'Paramsetup'

          },
          {
            displayName: 'Users',
            iconName: 'user',
            route: 'Userinfosetup'

          },
          {
            displayName: 'Controller',
            iconName: 'user',
            route: 'ControllerSetup'

          }

        ]
      },
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
