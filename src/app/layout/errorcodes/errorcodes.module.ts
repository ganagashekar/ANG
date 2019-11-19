import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ErrorcodesComponent } from './errorcodes.component';
import { ErrorcodesEditTemplateComponent } from '../gridEditorTemplates/errorcodesEditTemplate/errorcodesEditTemplate.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  entryComponents: [ErrorcodesEditTemplateComponent],
  declarations: [ErrorcodesComponent, ErrorcodesEditTemplateComponent]
})
export class ErrorcodesModule { }
