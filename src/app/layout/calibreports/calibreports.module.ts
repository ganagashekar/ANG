import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalibreportsComponent } from './calibreports.component';
import { MaterialModule } from '../../material/material.module';
import { CalibreportEditTemplateComponent } from '../gridEditorTemplates/calibreportEditTemplate/calibreportEditTemplate.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, MaterialModule, FormsModule , ReactiveFormsModule
  ],
  entryComponents: [CalibreportEditTemplateComponent],
  declarations: [CalibreportsComponent, CalibreportEditTemplateComponent]
})
export class CalibreportsModule { }
