import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalibrationlogsComponent } from './calibrationlogs.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { CalibLogsEditTemplateComponent } from '../gridEditorTemplates/calibLogsEditTemplate/calibLogsEditTemplate.component';


@NgModule({
  imports: [
    CommonModule, MaterialModule, FormsModule , ReactiveFormsModule
  ],
  entryComponents: [CalibLogsEditTemplateComponent],
  declarations: [CalibrationlogsComponent, CalibLogsEditTemplateComponent]
})
export class CalibrationlogsModule { }
