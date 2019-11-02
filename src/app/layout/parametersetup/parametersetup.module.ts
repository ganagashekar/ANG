import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametersetupComponent } from './parametersetup.component';
import {MaterialModule} from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParamterEditTemplateComponent } from '../gridEditorTemplates/paramterEditTemplate/ParamterEditTemplateComponent';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ParamterEditTemplateComponent,  ConfirmationDialogComponent],
  declarations: [ParametersetupComponent,  ParamterEditTemplateComponent, ConfirmationDialogComponent ]
})
export class ParametersetupModule {


}
