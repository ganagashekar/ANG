import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametersetupComponent } from './parametersetup.component';
import {MaterialModule} from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ParametersetupComponent]
})
export class ParametersetupModule {


}
