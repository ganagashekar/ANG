import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationLogsComponent } from './applicationlogs.component';
import { ApplogsEditTemplateComponent } from '../gridEditorTemplates/applogsEditTemplate/applogsEditTemplate.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  entryComponents: [ApplogsEditTemplateComponent],
  declarations: [ApplicationLogsComponent, ApplogsEditTemplateComponent]
})
export class ApplicationlogsModule { }
