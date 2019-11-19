import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControllerBusComponent } from './controllerbus.component';
import { ControllerbusEditTemplateComponent } from '../gridEditorTemplates/controllerbusEditTemplate/controllerbusEditTemplate.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],

  entryComponents: [ControllerbusEditTemplateComponent],
  declarations: [ControllerBusComponent, ControllerbusEditTemplateComponent]
})
export class ControllerbusModule { }
