import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../material/material.module';
import { UserinfoComponent } from './userinfo.component';
import { UserinfoEditTemplateComponent } from '../gridEditorTemplates/userinfoEditTemplate/userinfoEditTemplate.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  entryComponents: [UserinfoEditTemplateComponent],
  // declarations: [SitesetupComponent, SiteEditTemplateComponent]
  declarations: [UserinfoComponent , UserinfoEditTemplateComponent]
})
export class UserinfoModule { }
