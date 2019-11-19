import { NgModule } from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { SitesetupComponent } from './sitesetup.component';
import { SiteEditTemplateComponent } from '../gridEditorTemplates/siteEditTemplate/siteEditTemplate.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  entryComponents: [SiteEditTemplateComponent],
  declarations: [SitesetupComponent, SiteEditTemplateComponent]
})
export class SitesetupModule { }
