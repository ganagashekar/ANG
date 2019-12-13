import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalibrationlogsComponent } from './calibrationlogs.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
@NgModule({
  imports: [
    CommonModule, MaterialModule, FormsModule , ReactiveFormsModule
  ],
  declarations: [CalibrationlogsComponent]
})
export class CalibrationlogsModule { }
