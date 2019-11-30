import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalibrationsetupComponent } from './calibrationsetup.component';
import {MaterialModule} from '../../material/material.module';
import { CalibEditTemplateComponent } from '../gridEditorTemplates/calibEditTemplate/calibEditTemplate.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, MaterialModule, FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [CalibEditTemplateComponent],
  declarations: [CalibrationsetupComponent, CalibEditTemplateComponent]
})
export class CalibrationsetupModule { }
