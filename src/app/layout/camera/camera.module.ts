import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraComponent } from './camera.component';
import { MaterialModule } from '../../material/material.module';
import { CameraEditTemplateComponent } from '../gridEditorTemplates/cameraEditTemplate/cameraEditTemplate.component';
import { LiveCameraTemplateComponent } from '../gridEditorTemplates/LiveCameraTemplate/LiveCameraTemplate.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule, MaterialModule, FormsModule, ReactiveFormsModule
  ],
  entryComponents: [CameraEditTemplateComponent, LiveCameraTemplateComponent],
  declarations: [CameraComponent, CameraEditTemplateComponent, LiveCameraTemplateComponent]
})
export class CameraModule { }
