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


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        MaterialModule,
        TranslateModule,
        ParametersetupModule,

    ],
    declarations: [Screen2Component,  LayoutComponent, NavComponent, TopnavComponent, SidebarComponent     ]

})
export class LayoutModule { }
