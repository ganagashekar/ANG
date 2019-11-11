import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartModule } from 'angular-highcharts';
import {MaterialModule} from '../../material/material.module';
import { StatModule } from '../../shared/modules/stat/stat.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HighchartsChartModule } from 'highcharts-angular';
@NgModule({
    imports: [
      ChartModule,
        CommonModule,
        DashboardRoutingModule,
        HighchartsChartModule,
        StatModule,
        MaterialModule,
        FlexLayoutModule.withConfig({addFlexToParent: false})
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule {}
