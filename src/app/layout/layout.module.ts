import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {MaterialModule} from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { ParametersetupModule } from './parametersetup/parametersetup.module';
import { AverageReportComponent } from './Reports/AverageReport/AverageReport.component';
import { ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuListItemComponent } from './components/menu-list-item/menu-list-item.component';
import { NavService } from '../shared/services/nav.service';
import { UserinfoComponent } from './Userinfo/Userinfo.component';
import { ControllerComponent } from './controller/Controller.component';
import { SitesetupComponent } from './sitesetup/sitesetup.component';
import { ControllerBusComponent } from './Controller-bus/Controller-bus.component';
import { ApplicationLogsComponent } from './ApplicationLogs/ApplicationLogs.component';
import { ConfgComponent } from './confg/confg.component';
import { AuditComponent } from './Audit/Audit.component';
import { ErrorCodeComponent } from './ErrorCode/ErrorCode.component';
import { UserinfoEditTemplateComponent } from 'src/app/layout/gridEditorTemplates/userinfoEditTemplate/userinfoEditTemplate.Component';
import { LogEditTemplateComponent } from 'src/app/layout/gridEditorTemplates/logEditTemplate/logEditTemplate.Component';
import { CntrBusEditTemplateComponent } from 'src/app/layout/gridEditorTemplates/CntrBusEditTemplate/CntrBusEditTemplate.Component';
import { SiteEditTemplateComponent } from 'src/app/layout/gridEditorTemplates/SiteEditTemplate/SiteEditTemplate.Component';
import { ConfigEditTemplateComponent } from 'src/app/layout/gridEditorTemplates/ConfigEditTemplate/ConfigEditTemplate.Component';
import { ConfirmationDialogComponent } from 'src/app/layout/components/confirmation-dialog/confirmation-dialog.Component';
import { RealtimeReportComponent } from './Reports/RealtimeReport/RealtimeReport.component';
import { ExceedenceReportComponent } from './Reports/ExceedenceReport/ExceedenceReport.component';
import { ContrEditTemplateComponent } from 'src/app/layout/gridEditorTemplates/ContrEditTemplate/ContrEditTemplate.Component';

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
        ReactiveFormsModule
    ],



    providers: [NavService],
    // declarations: [Screen2Component, LayoutComponent, NavComponent, TopnavComponent, SidebarComponent,
    // AverageReportComponent, MenuListItemComponent    ]

    entryComponents: [UserinfoEditTemplateComponent, CntrBusEditTemplateComponent, LogEditTemplateComponent,
       SiteEditTemplateComponent, ConfigEditTemplateComponent],

    declarations: [ UserinfoComponent,  LayoutComponent, TopnavComponent, SidebarComponent,
      ControllerComponent, SitesetupComponent, ControllerBusComponent, ApplicationLogsComponent, ConfgComponent, AuditComponent,
      ErrorCodeComponent, CntrBusEditTemplateComponent, UserinfoEditTemplateComponent, LogEditTemplateComponent,
      SiteEditTemplateComponent, ConfigEditTemplateComponent, AverageReportComponent, MenuListItemComponent
      , RealtimeReportComponent , ExceedenceReportComponent, ControllerComponent]
     //  SiteEditTemplateComponent, ConfigEditTemplateComponent, ContrEditTemplateComponent ]
    // declarations: [Screen2Component, UserinfoComponent,  LayoutComponent, NavComponent, TopnavComponent, SidebarComponent,
    //   ControllerComponent, SitesetupComponent, ControllerBusComponent, ApplicationLogsComponent, ConfgComponent, AuditComponent,
    //   ErrorCodeComponent, CntrBusEditTemplateComponent, UserinfoEditTemplateComponent, LogEditTemplateComponent,
    //   SiteEditTemplateComponent, ConfigEditTemplateComponent , AverageReportComponent, MenuListItemComponent, ContrEditTemplateComponent
    //     ]


})
export class LayoutModule { }
