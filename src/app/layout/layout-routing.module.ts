import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalibreportsComponent } from './calibreports/calibreports.component';
import { LayoutComponent } from './layout.component';
import { ParametersetupComponent } from './parametersetup/parametersetup.component';
import { AverageReportComponent } from './Reports/AverageReport/AverageReport.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { SitesetupComponent} from './sitesetup/sitesetup.component';
import { RealtimeReportComponent } from './Reports/RealtimeReport/RealtimeReport.component';
import { ExceedenceReportComponent } from './Reports/ExceedenceReport/ExceedenceReport.component';
import { HistoricalReportComponent } from './Reports/HistoricalReport/HistoricalReport.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ControllerBusComponent } from './controllerbus/controllerbus.component';
import { ControllersSComponent } from './controllers-s/controllers-s.component';
import { ConfigurationSComponent } from './configuration-s/configuration-s.component';
import { AuditsComponent } from './audits/audits.component';
import { ErrorcodesComponent } from './errorcodes/errorcodes.component';
import { ApplicationLogsComponent } from './applicationlogs/applicationLogs.component';
import { CalibrationsetupComponent } from './calibrationsetup/calibrationsetup.component';
import { CalibrationlogsComponent } from './calibrationlogs/calibrationlogs.component';
import { CameraComponent } from './camera/camera.component';
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

            path: 'HistoricalReport',
            component: HistoricalReportComponent
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
              component: ControllersSComponent
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
              component: ConfigurationSComponent
            },
            {
              path: 'audit',
              component: AuditsComponent
            },
            {
              path: 'Error',
              component: ErrorcodesComponent
          },
          {
            path: 'Calibration',
            component: CalibrationsetupComponent
        },
        {
          path: 'Calib',
          component: CalibreportsComponent
      },
      {
        path: 'Calibrationreport',
        component: CalibrationlogsComponent
    },
    {
      path: 'Camera',
      component: CameraComponent
  },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
