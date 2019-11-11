import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { Screen1Component } from './screen1/screen1.component';
import { Screen2Component } from './screen2/screen2.component';
import { ParametersetupComponent } from './parametersetup/parametersetup.component';
import { UserinfoComponent } from './Userinfo/Userinfo.component';
import { ControllerComponent } from './Controller/Controller.component';
import { SitesetupComponent} from './sitesetup/sitesetup.component';
import { ControllerBusComponent } from './Controller-bus/Controller-bus.component';
import { ApplicationLogsComponent } from './ApplicationLogs/ApplicationLogs.component';
import { ConfgComponent } from './confg/confg.component';
import { AuditComponent } from './Audit/Audit.component';
import { ErrorCodeComponent } from './ErrorCode/ErrorCode.component';



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
                path: 'screen1',
                loadChildren: './screen1/screen1.module#Screen1Module'
            },
            {
                path: 'screen2',
                component: Screen2Component
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
