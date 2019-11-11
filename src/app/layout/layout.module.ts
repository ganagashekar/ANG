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
import { UserinfoComponent } from './Userinfo/Userinfo.component';
import { ControllerComponent } from './Controller/Controller.component';
import { SitesetupComponent } from './sitesetup/sitesetup.component';
import { ControllerBusComponent } from './Controller-bus/Controller-bus.component';
import { ApplicationLogsComponent } from './ApplicationLogs/ApplicationLogs.component';
import { ConfgComponent } from './confg/confg.component';
import { AuditComponent } from './Audit/Audit.component';
import { ErrorCodeComponent } from './ErrorCode/ErrorCode.component';
import { UserinfoEditTemplateComponent } from 'src/app/layout/gridEditorTemplates/userinfoEditTemplate/userinfoEditTemplate.Component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LogEditTemplateComponent } from 'src/app/layout/gridEditorTemplates/logEditTemplate/logEditTemplate.Component';
import { CntrEditTemplateComponent } from 'src/app/layout/gridEditorTemplates/CntrEditTemplate/CntrEditTemplate.component';
import { CntrBusEditTemplateComponent } from 'src/app/layout/gridEditorTemplates/CntrBusEditTemplate/CntrBusEditTemplate.Component';
import { SiteEditTemplateComponent } from 'src/app/layout/gridEditorTemplates/SiteEditTemplate/SiteEditTemplate.Component';
import { ConfigEditTemplateComponent } from 'src/app/layout/gridEditorTemplates/ConfigEditTemplate/ConfigEditTemplate.Component';
import { ConfirmationDialogComponent } from 'src/app/layout/components/confirmation-dialog/confirmation-dialog.Component';



@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        MaterialModule,
        TranslateModule,
        ParametersetupModule,
        ReactiveFormsModule,
        FormsModule
    ],
    entryComponents: [UserinfoEditTemplateComponent, CntrBusEditTemplateComponent, LogEditTemplateComponent,
       SiteEditTemplateComponent, ConfigEditTemplateComponent],
    declarations: [Screen2Component, UserinfoComponent,  LayoutComponent, NavComponent, TopnavComponent, SidebarComponent,
      ControllerComponent, SitesetupComponent, ControllerBusComponent, ApplicationLogsComponent, ConfgComponent, AuditComponent,
      ErrorCodeComponent, CntrBusEditTemplateComponent, UserinfoEditTemplateComponent, LogEditTemplateComponent,
      SiteEditTemplateComponent, ConfigEditTemplateComponent
        ]

})
export class LayoutModule { }
