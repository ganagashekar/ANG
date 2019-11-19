import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditsComponent } from './audits.component';
import { AuditsEditTemplateComponent } from '../gridEditorTemplates/auditsEditTemplate/auditsEditTemplate.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  entryComponents: [AuditsEditTemplateComponent],
  declarations: [AuditsComponent, AuditsEditTemplateComponent]
})
export class AuditsModule { }
