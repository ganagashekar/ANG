import { NgModule } from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { ForgotpasswordComponent } from './Forgotpassword.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  entryComponents: [ForgotpasswordComponent],
  declarations: [ForgotpasswordComponent]
})
export class ForgotpasswordModule { }
