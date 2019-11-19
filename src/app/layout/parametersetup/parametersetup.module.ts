import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametersetupComponent } from './parametersetup.component';
import {MaterialModule} from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParamterEditTemplateComponent } from '../gridEditorTemplates/paramterEditTemplate/ParamterEditTemplateComponent';



@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
 
  ],
  entryComponents: [ParamterEditTemplateComponent],
  declarations: [ParametersetupComponent,  ParamterEditTemplateComponent ]
})
export class ParametersetupModule {


}
