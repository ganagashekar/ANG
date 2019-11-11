import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { Screen1Component } from './screen1/screen1.component';
import { Screen2Component } from './screen2/screen2.component';
import { ParametersetupComponent } from './parametersetup/parametersetup.component';
import { AverageReportComponent } from './Reports/AverageReport/AverageReport.component';





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
              path: 'AverageReport',
              component: AverageReportComponent
          },
            {
              path: 'Paramsetup',
              component: ParametersetupComponent
          }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
