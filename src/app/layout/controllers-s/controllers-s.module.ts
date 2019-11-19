import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControllersSComponent } from './controllers-s.component';
import { ControllerEditTemplateComponent } from '../gridEditorTemplates/controllerEditTemplate/controllerEditTemplate.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  entryComponents: [ControllerEditTemplateComponent],
  declarations: [ControllersSComponent , ControllerEditTemplateComponent]


})
export class ControllersSModule { }
