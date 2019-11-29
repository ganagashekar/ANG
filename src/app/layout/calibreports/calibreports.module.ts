import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalibreportsComponent } from './calibreports.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  imports: [
    CommonModule, MaterialModule
  ],
  declarations: [CalibreportsComponent]
})
export class CalibreportsModule { }
