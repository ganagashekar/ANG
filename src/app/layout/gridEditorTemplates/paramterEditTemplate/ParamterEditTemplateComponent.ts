import { Component, OnInit, Output, Inject, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { SetupsService } from '../../../shared/services/Setups.service';
import { ReferenceRecords } from '../../../Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { ParamModel } from '../../../Model/ServiceResposeModel/Setups/ParamModel';
import { ParameterFilter } from '../../../Model/FilterModels/ParameterFilter';
@Component({
  selector: 'app-paramtereditemplate',
  templateUrl: './paramterEditTemplate.component.html',
  styleUrls: ['./paramterEditTemplate.component.css']
})
export class ParamterEditTemplateComponent implements OnInit {
  @Output()
  parameterEditorEmitter = new EventEmitter<any>();
  schedulerForm: FormGroup;
  stacksArray: ReferenceRecords[] = [];
  paramArray: ReferenceRecords[] = [];
  paramUnitsArray: ReferenceRecords[] = [];
  isAdd = true;
  SelectedParam: string;
  SelectedparameterId = 0;
  editModel: ParamModel;
  parameterFilter: ParameterFilter;
  constructor(public dialogRef: MatDialogRef<ParamterEditTemplateComponent>, private _setupsservices: SetupsService,
    @Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder,
     private snackBar: MatSnackBar) {
      this.parameterFilter = new ParameterFilter();
    if (data !== undefined && data.action === 'edit') {
      this.isAdd = false;
      this.editModel = (data.scheduler as ParamModel );
      this.SelectedParam = this.editModel.paramname;
      this.SelectedparameterId = this.editModel.paramid;
    }




  }
  ngOnInit() {
    this.getAllStacks();
    this.getAllParameterList(0);
    this.getAllParameterUnitsList(0);
    this.schedulerForm = this.formBuilder.group({
      confgid: new FormControl('', [Validators.required]),
      paramname: new FormControl('', [Validators.required]),
      paramunit: new FormControl('', [Validators.required]),
      paramminval: new FormControl('', [Validators.required]),
      parammaxval: new FormControl('', [Validators.required]),
      threshholdval: new FormControl('', [Validators.required]),
      paramposition: new FormControl('', [Validators.required])
    });

    if (this.isAdd) { // scheduler add
      const currentTime = new Date().getHours().toString() + ':' + new Date().getMinutes().toString();
      this.schedulerForm.patchValue({
      });
    } else {


        this.schedulerForm.patchValue({
          confgid: this.editModel.confgid,
          paramname: this.editModel.paramname,
          paramunit: this.editModel.paramunit,
          paramminval: this.editModel.paramminval,
          parammaxval: this.editModel.parammaxval,
          threshholdval: this.editModel.threshholdval,
          paramposition: this.editModel.paramposition
        });


      }




  }

  getAllStacks(): void {
    this._setupsservices.getAllStacks(0, false).subscribe(resp => {
      this.stacksArray = resp.model as ReferenceRecords[];
    }, error => {
      console.log('Error: ' + error);
    });
  }

  getAllParameterList(stackId: number): void {

    this.parameterFilter.SiteId = 1;
    this.parameterFilter.StackId = stackId;
    this._setupsservices.getReferencerecords(8, false).subscribe(resp => {
      this.paramArray = resp.model as ReferenceRecords[];
   }, error => {
     console.log('Error: ' + error);
   });
 }

 getAllParameterUnitsList(paramId: number): void {

  this.parameterFilter.SiteId = 1;
  this.parameterFilter.StackId = paramId;
  this._setupsservices.getReferencerecords(7, false).subscribe(resp => {
    this.paramUnitsArray = resp.model as ReferenceRecords[];
 }, error => {
   console.log('Error: ' + error);
 });
}

  StackChange(stackId: number): void {
    // this.getAllParameterList(stackId);
    // this.showSnackBar('Task Updated Successfully.' + stackId);
  }
  ParamterChange(paramId: number): void {
    // this.getAllParameterUnitsList(paramId);
    // this.showSnackBar('Task Updated Successfully.' + paramId);
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
      schedulerDetails.paramid = this.SelectedparameterId;
    }
    this._setupsservices.saveParameter(schedulerDetails).subscribe(resp => {
      this.onCloseClick();
      this.parameterEditorEmitter.emit(resp);
    }, error => {
      console.log('Error: ' + error);
      this.schedulerForm.enable();
    });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
