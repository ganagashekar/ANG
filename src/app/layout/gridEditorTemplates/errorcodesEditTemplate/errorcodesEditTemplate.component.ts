import { Component, OnInit, Output, Inject, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ErrorCodeSetupService } from '../../../shared/services/ErrorCodeSetup.service';
import { ReferenceRecords } from '../../../Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { ErrorCodeSetupModel } from '../../../Model/ServiceResposeModel/Setups/ErrorCodeSetupModel';
import { ErrorCodeSetupFilter } from '../../../Model/FilterModels/ErrorCodeSetupFilter';

@Component({
  selector: 'app-errorcodesEditTemplate',
  templateUrl: './errorcodesEditTemplate.component.html',
  styleUrls: ['./errorcodesEditTemplate.component.scss']
})
export class ErrorcodesEditTemplateComponent implements OnInit {

  @Output()
  errorCodeEditorEmitter = new EventEmitter<any>();
  schedulerForm: FormGroup;
  // stacksArray: ReferenceRecords[] = [];
  // paramArray: ReferenceRecords[] = [];
  // paramUnitsArray: ReferenceRecords[] = [];
  isAdd = true;
  // SelectedErrorCode: string;
  // SelectedErrorDesc: string;
  editModel: ErrorCodeSetupModel;
  errorCodeSetupFilter: ErrorCodeSetupFilter;
  constructor(public dialogRef: MatDialogRef<ErrorcodesEditTemplateComponent>, private _errorcodeservices: ErrorCodeSetupService,
    @Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder,
     private snackBar: MatSnackBar) {
      this.errorCodeSetupFilter = new ErrorCodeSetupFilter();
    if (data !== undefined && data.action === 'edit') {
      this.isAdd = false;
      this.editModel = (data.Scheduler as ErrorCodeSetupModel );
      // this.SelectedErrorCode = this.editModel.errorcode;
      // this.SelectedErrorDesc = this.editModel.errordesc;
    }


  }
  ngOnInit() {
    this.schedulerForm = this.formBuilder.group({
      errorcode: new FormControl('', [Validators.required]),
      errordesc: new FormControl('', [Validators.required]),
    });

    if (this.isAdd) { // scheduler add
      const currentTime = new Date().getHours().toString() + ':' + new Date().getMinutes().toString();
      this.schedulerForm.patchValue({
      });
    } else {


        this.schedulerForm.patchValue({
          errorcode: this.editModel.errorcode,
          errordesc: this.editModel.errordesc,

        });


      }
  }

  showSnackBar(message: string, isError: boolean = false): void {
    if (isError) {
      this.snackBar.open(message, 'Ok');
    } else {
      this.snackBar.open(message, 'Ok', {
        duration: 3000
      });
    }
  }

  onFormSubmit(): void {
    if (this.schedulerForm.valid) {
      this.schedulerForm.disable();
      this.saveScheduler();

    }
  }

  saveScheduler(): void {
    const schedulerDetails = this.schedulerForm.value;
   if (!this.isAdd) {
     // schedulerDetails.errorcode = this.SelectedErrorCode;
   }
   this._errorcodeservices.saveErrorCode(schedulerDetails).subscribe(resp => {
     this.onCloseClick();
     this.errorCodeEditorEmitter.emit(resp);
   }, error => {
     console.log('Error: ' + error);
     this.schedulerForm.enable();
   });
 }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
