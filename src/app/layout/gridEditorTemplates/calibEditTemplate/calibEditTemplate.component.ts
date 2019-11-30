import { Component, OnInit, Output, Inject, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CalibrationService } from 'src/app/shared/services/Calibration.service';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { CalibrationModel } from 'src/app/Model/ServiceResposeModel/Setups/CalibrationSetupModel';
import { CalibrationFilter } from 'src/app/Model/FilterModels/CalibrationFilter';


@Component({
  selector: 'app-calibedittemplate',
  templateUrl: './calibEditTemplate.component.html',
  styleUrls: ['./calibEditTemplate.component.scss']
})
export class CalibEditTemplateComponent implements OnInit {
  @Output()
  CalibEditorEmitter = new EventEmitter<any>();
  schedulerForm: FormGroup;
  // paramUnitsArray: ReferenceRecords[] = [];
  isAdd = true;
 Selectedconfg_id: bigint ;
 // SelectedvendorisEnabled: number;
 // SelecteduserName: string;
 // SelectedvendorsiteId: bigint;
  editModel: CalibrationModel;
  CalibrationFilter: CalibrationFilter;
  constructor(public dialogRef: MatDialogRef<CalibEditTemplateComponent>, private _calibrationservices: CalibrationService,
    @Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder,
     private snackBar: MatSnackBar) {
      this.CalibrationFilter = new CalibrationFilter();
    if (data !== undefined && data.action === 'edit') {
      this.isAdd = false;
      this.editModel = (data.Scheduler as CalibrationModel );
     this.Selectedconfg_id = this.editModel.confg_id;
     // this.SelecteduserName = this.editModel.userName;
     // this.SelectedvendorsiteId = this.editModel.vendorSiteId;
     // this.SelectedvendorisEnabled = this.editModel.isEnabled;
    }


  }

  ngOnInit() {
  // this.getAllParameterList(0);
    // this.getAllParameterUnitsList(0);
    this.schedulerForm = this.formBuilder.group({
      confg_id: new FormControl('', [Validators.required]),
      stack_name: new FormControl('', [Validators.required]),
      param_name: new FormControl('', [Validators.required]),
      setZeroCmd: new FormControl('', [Validators.required]),
      setZeroResp: new FormControl('', [Validators.required]),
      zeroRelayOpenCmd: new FormControl('', [Validators.required]),
      zeroRelayOpenResp: new FormControl('', [Validators.required]),
      zeroRelayCloseCmd: new FormControl('', [Validators.required]),
      zeroRelayCloseResp: new FormControl('', [Validators.required]),
      readPrevValueCmd: new FormControl('', [Validators.required]),
      readPrevValueRes: new FormControl('', [Validators.required]),
      realGasRelayOpenCmd: new FormControl('', [Validators.required]),
      realGasRelayOpenResp: new FormControl('', [Validators.required]),
      realGasRelayCloseCmd: new FormControl('', [Validators.required]),
      real_GasRelayCloseResp: new FormControl('', [Validators.required]),
      setNewValueCmd: new FormControl('', [Validators.required]),
      setNewValueResp: new FormControl('', [Validators.required]),
      setMakeSpanCmd: new FormControl('', [Validators.required]),
      setMakeSpanResp: new FormControl('', [Validators.required]),

    });

    if (this.isAdd) { // scheduler add
      const currentTime = new Date().getHours().toString() + ':' + new Date().getMinutes().toString();
      this.schedulerForm.patchValue({
      });
    } else {


        this.schedulerForm.patchValue({
          confg_id: this.editModel.confg_id,
          stack_name: this.editModel.stack_name,
          param_name: this.editModel.param_name,
          setZeroCmd: this.editModel.setZeroCmd,
          setZeroResp: this.editModel.setZeroResp,
          zeroRelayOpenCmd: this.editModel.zeroRelayOpenCmd,
          zeroRelayOpenResp: this.editModel.zeroRelayOpenResp,
          zeroRelayCloseCmd: this.editModel.zeroRelayCloseCmd,
          zeroRelayCloseResp: this.editModel.zeroRelayCloseResp,
          readPrevValueCmd: this.editModel.readPrevValueCmd,
          readPrevValueRes: this.editModel.readPrevValueRes,
          realGasRelayOpenCmd: this.editModel.realGasRelayOpenCmd,
          realGasRelayOpenResp: this.editModel.realGasRelayOpenResp,
          realGasRelayCloseCmd: this.editModel.realGasRelayCloseCmd,
          real_GasRelayCloseResp: this.editModel.real_GasRelayCloseResp,
          setNewValueCmd: this.editModel.setNewValueCmd,
          setNewValueResp: this.editModel.setNewValueResp,
          setMakeSpanCmd: this.editModel.setMakeSpanCmd,
          setMakeSpanResp: this.editModel.setMakeSpanResp,

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
     schedulerDetails.userId = this.Selectedconfg_id;
   }
   this._calibrationservices.saveCalibration(schedulerDetails).subscribe(resp => {
     this.onCloseClick();
     this.CalibEditorEmitter.emit(resp);
   }, error => {
     console.log('Error: ' + error);
     this.schedulerForm.enable();
   });
 }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
