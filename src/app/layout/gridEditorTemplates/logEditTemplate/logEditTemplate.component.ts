import { Component, OnInit, Output, Inject, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { UserinfoService } from 'src/app/shared/services/Userinfo.service';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { ApplicationLogsModel } from 'src/app/Model/ServiceResposeModel/CommonModel/ApplicationLogsModel';
import { ApplicationLogsFilter } from 'src/app/Model/FilterModels/ApplicationLogsFilter';
import { ApplicationLogsService } from 'src/app/shared/services/ApplicationLogs.service';
@Component({
  selector: 'app-logEditTemplate',
  templateUrl: './logEditTemplate.component.html',
  styleUrls: ['./logEditTemplate.component.scss']
})
export class LogEditTemplateComponent implements OnInit {

    @Output()
    ApplicationLogsEditorEmitter = new EventEmitter<any>();
    schedulerForm: FormGroup;
    // stacksArray: ReferenceRecords[] = [];
    // paramArray: ReferenceRecords[] = [];
    // paramUnitsArray: ReferenceRecords[] = [];
    isAdd = true;
    SelectedlogID: bigint ;
    SelectedconfgID: bigint;
    SelectederrorCode: string;
    editModel: ApplicationLogsModel;
    ApplicationLogsFilter:  ApplicationLogsFilter;
    constructor(public dialogRef: MatDialogRef<LogEditTemplateComponent>, private _ApplicationLogsservices: ApplicationLogsService,
      @Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder,
       private snackBar: MatSnackBar) {
        this.ApplicationLogsFilter = new ApplicationLogsFilter();
      if (data !== undefined && data.action === 'edit') {
        this.isAdd = false;
        this.editModel = (data.Scheduler as  ApplicationLogsModel);
        this.SelectedlogID = this.editModel.logID;
        this.SelectedconfgID = this.editModel.confgID;
        this.SelectederrorCode = this.editModel.errorCode;
      }
    }
    ngOnInit() {
      // this.getAllStacks();
      // this.getAllParameterList(0);
      // this.getAllParameterUnitsList(0);
      this.schedulerForm = this.formBuilder.group({
        logID: new FormControl('', [Validators.required]),
        confgID: new FormControl('', [Validators.required]),
        errorCode: new FormControl('', [Validators.required]),
      });

      if (this.isAdd) { // scheduler add
        const currentTime = new Date().getHours().toString() + ':' + new Date().getMinutes().toString();
        this.schedulerForm.patchValue({
        });
      } else {


          this.schedulerForm.patchValue({
            logID: this.editModel.logID,
            confgID: this.editModel.confgID,
            errorCode: this.editModel.errorCode,

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
       schedulerDetails.logId = this.SelectedlogID;
     }
     this._ApplicationLogsservices. saveApplicationLogs(schedulerDetails).subscribe(resp => {
       this.onCloseClick();
       this.ApplicationLogsEditorEmitter.emit(resp);
     }, error => {
       console.log('Error: ' + error);
       this.schedulerForm.enable();
     });
   }

    onCloseClick(): void {
      this.dialogRef.close();
    }

  }
