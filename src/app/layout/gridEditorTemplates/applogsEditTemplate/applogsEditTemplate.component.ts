import { Component, OnInit, Output, Inject, EventEmitter } from '@angular/core';
import { ApplicationLogsModel } from 'src/app/Model/ServiceResposeModel/CommonModel/ApplicationLogsModel';
import { ApplicationLogsFilter } from 'src/app/Model/FilterModels/ApplicationLogsFilter';
import { ApplicationLogsService } from 'src/app/shared/services/ApplicationLogs.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-applogsEditTemplate',
  templateUrl: './applogsEditTemplate.component.html',
  styleUrls: ['./applogsEditTemplate.component.scss']
})
export class ApplogsEditTemplateComponent implements OnInit {

  @Output()
  ApplicationLogsEditorEmitter = new EventEmitter<any>();
  schedulerForm: FormGroup;

  isAdd = true;
  SelectedlogID: bigint ;
  SelectedconfgID: bigint;
  SelectederrorCode: string;
  editModel: ApplicationLogsModel;
  ApplicationLogsFilter:  ApplicationLogsFilter;
  constructor(public dialogRef: MatDialogRef<ApplogsEditTemplateComponent>, private _ApplicationLogsservices: ApplicationLogsService,
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

