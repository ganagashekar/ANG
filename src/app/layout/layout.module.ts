import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {MaterialModule} from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavComponent } from './nav/nav.component';
import { Screen2Component } from './screen2/screen2.component';
import { ParametersetupModule } from './parametersetup/parametersetup.module';
import { AverageReportComponent } from './Reports/AverageReport/AverageReport.component';
import { ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuListItemComponent } from './components/menu-list-item/menu-list-item.component';
import { NavService } from '../shared/services/nav.service';






@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        HighchartsChartModule,
        MaterialModule,
        TranslateModule,
        ParametersetupModule,
        ChartModule,
        FormsModule,
        ReactiveFormsModule,
    ],
 providers: [NavService],
    declarations: [Screen2Component, LayoutComponent, NavComponent, TopnavComponent, SidebarComponent,
    AverageReportComponent, MenuListItemComponent    ]

})
export class LayoutModule { }
