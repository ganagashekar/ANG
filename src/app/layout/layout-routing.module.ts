import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';

import { ParametersetupComponent } from './parametersetup/parametersetup.component';

import { AverageReportComponent } from './Reports/AverageReport/AverageReport.component';



import { UserinfoComponent } from './Userinfo/Userinfo.component';
import { ControllerComponent } from './controller/Controller.component';
import { SitesetupComponent} from './sitesetup/sitesetup.component';
import { ControllerBusComponent } from './Controller-bus/Controller-bus.component';
import { ApplicationLogsComponent } from './ApplicationLogs/ApplicationLogs.component';
import { ConfgComponent } from './confg/confg.component';
import { AuditComponent } from './Audit/Audit.component';
import { ErrorCodeComponent } from './ErrorCode/ErrorCode.component';
import { RealtimeReportComponent } from './Reports/RealtimeReport/RealtimeReport.component';
import { ExceedenceReportComponent } from './Reports/ExceedenceReport/ExceedenceReport.component';
import { DashboardComponent } from './dashboard/dashboard.component';




const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },


            {

              path: 'AverageReport',
              component: AverageReportComponent
          },

          {

            path: 'RealtimeReport',
            component: RealtimeReportComponent
        },
        {

          path: 'ExceedenceReport',
          component: ExceedenceReportComponent
      },
            {
              path: 'SiteSetup',
              component: SitesetupComponent
            },

            {
              path: 'Paramsetup',
              component: ParametersetupComponent
            },
            {
              path: 'Userinfosetup',
              component: UserinfoComponent
            },
            {
              path: 'Controllersetup',
              component: ControllerComponent
            },
            {
              path: 'ControllerBusSetup',
              component: ControllerBusComponent
            },
            {
              path: 'ApplicationLogs',
              component: ApplicationLogsComponent
            },
            {
              path: 'Confg',
              component: ConfgComponent
            },
            {
              path: 'audit',
              component: AuditComponent
            },
            {
              path: 'Error',
              component: ErrorCodeComponent
          }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
