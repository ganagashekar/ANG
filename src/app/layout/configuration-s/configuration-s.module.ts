import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationSComponent } from './configuration-s.component';
import { ConfigurationEditTemplateComponent } from '../gridEditorTemplates/configurationEditTemplate/configurationEditTemplate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  entryComponents:[ConfigurationEditTemplateComponent],
  declarations: [ConfigurationSComponent,ConfigurationEditTemplateComponent]
})
export class ConfigurationSModule { }
