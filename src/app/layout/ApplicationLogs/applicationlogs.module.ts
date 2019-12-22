import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationLogsComponent } from './applicationLogs.component';
import { ApplogsEditTemplateComponent } from '../gridEditorTemplates/applogsEditTemplate/applogsEditTemplate.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
  ],
  entryComponents: [ApplogsEditTemplateComponent],
  declarations: [ApplicationLogsComponent, ApplogsEditTemplateComponent]
})
export class ApplicationlogsModule { }
