import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
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
import { MenuListItemComponent } from './components/menu-list-item/menu-list-item.component';
import { NavService } from '../shared/services/nav.service';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { RealtimeReportComponent } from './Reports/RealtimeReport/RealtimeReport.component';
import { ExceedenceReportComponent } from './Reports/ExceedenceReport/ExceedenceReport.component';
import { SitesetupModule } from './sitesetup/sitesetup.module';
import { UserinfoModule } from './userinfo/userinfo.module';
import { ControllerbusModule } from './controllerbus/controllerbus.module';
import { ControllersSModule } from './controllers-s/controllers-s.module';
import { ConfigurationSModule } from './configuration-s/configuration-s.module';
import { AuditsModule } from './audits/audits.module';
import { ApplicationlogsModule } from './applicationlogs/applicationlogs.module';
import { ErrorcodesModule } from './errorcodes/errorcodes.module';
import { ForgotpasswordModule } from '../forgotpassword/forgotpassword.module';
import { CalibrationsetupModule } from './calibrationsetup/calibrationsetup.module';
import { CalibreportsModule } from './calibreports/calibreports.module';
import { CalibrationlogsModule } from './calibrationlogs/calibrationlogs.module';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { CommonpopupComponent } from './dashboard/popups/commonpopup/commonpopup.component';
import { CameraModule } from './camera/camera.module';
import * as Highcharts from 'highcharts/highstock';
import * as _moment from 'moment';
import * as HC_exporting_ from 'highcharts/modules/exporting';
import { SafePipe } from '../shared/pipes/safe.pipe';


@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        SitesetupModule,
        UserinfoModule,
        AuditsModule,
        FormsModule,
        ReactiveFormsModule,
        LayoutRoutingModule,
        HighchartsChartModule,
        MaterialModule,
        TranslateModule,
        ParametersetupModule,
        ChartModule,
        ErrorcodesModule,
        ApplicationlogsModule,
        ConfigurationSModule,
        ControllersSModule,
        FormsModule,
        ControllerbusModule,
        ForgotpasswordModule,
        CalibrationsetupModule, CalibreportsModule,
        CalibrationlogsModule,
        NgxMaterialTimepickerModule,
        CameraModule,
        HighchartsChartModule,
    ],
    providers: [NavService],

    entryComponents: [
         ConfirmationDialogComponent, CommonpopupComponent],

    declarations: [  CommonpopupComponent,  ConfirmationDialogComponent,  LayoutComponent, TopnavComponent, SidebarComponent,
        AverageReportComponent, MenuListItemComponent
      , RealtimeReportComponent , ExceedenceReportComponent,]


})
export class LayoutModule { }
