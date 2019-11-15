import { Component, OnInit, Output, Inject, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ControllerBusService } from 'src/app/shared/services/ControllerBus.services';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { ControllerBusModel } from 'src/app/Model/ServiceResposeModel/Setups/ControllerBusModel';
import { ControllerBusFilter } from 'src/app/Model/FilterModels/ControllerBusFilter';

@Component({
  selector: 'app-CntrBusEditTemplate',
  templateUrl: './CntrBusEditTemplate.component.html',
  styleUrls: ['./CntrBusEditTemplate.component.scss']
})
export class CntrBusEditTemplateComponent implements OnInit {

  @Output()
  CntrBusEditorEmitter = new EventEmitter<any>();
  schedulerForm: FormGroup;
  sitebaudrateArray: ReferenceRecords[] = [];
  siteprotocalArray: ReferenceRecords[] = [];
  // paramUnitsArray: ReferenceRecords[] = [];
  isAdd = true;
 SelectedbusId: bigint ;
 SelectedmacId: string;
 // SelectedbaudRate: bigint;
 // SelectedtimeOut: bigint;
 // SelectedstartIndex: bigint;
 // SelecteduserName: string;
 // SelectedvendorsiteId: bigint;
  editModel: ControllerBusModel;
  ControllerBusFilter: ControllerBusFilter ;
  constructor(public dialogRef: MatDialogRef<CntrBusEditTemplateComponent>, private _ControllerBusService: ControllerBusService,
    @Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder,
     private snackBar: MatSnackBar) {
      this.ControllerBusFilter = new ControllerBusFilter();
    if (data !== undefined && data.action === 'edit') {
      this.isAdd = false;
      this.editModel = (data.Scheduler as  ControllerBusModel);
     this.SelectedbusId = this.editModel.busId;
     // this.SelecteduserName = this.editModel.userName;
     this.SelectedmacId = this.editModel.macId;
     // this.SelectedvendorisEnabled = this.editModel.isEnabled;
    // this.SelectedbaudRate = this.editModel.baudRate;
    // this.SelectedtimeOut = this.editModel.timeOut;
    // this.SelectedstartIndex = this.editModel.startIndex;
    }


  }
  ngOnInit() {
     this.getAllBaudrateList(0);
     this.getAllprotocalist(0);
    // this.getAllParameterUnitsList(0);
    this.schedulerForm = this.formBuilder.group({
      busId: new FormControl('', [Validators.required]),
      macId: new FormControl('', [Validators.required]),
      comPort: new FormControl('', [Validators.required]),
      protocal: new FormControl('', [Validators.required]),
      baudRate: new FormControl('', [Validators.required]),
      timeOut: new FormControl('', [Validators.required]),
      startIndex: new FormControl('', [Validators.required]),

    });

    if (this.isAdd) { // scheduler add
      const currentTime = new Date().getHours().toString() + ':' + new Date().getMinutes().toString();
      this.schedulerForm.patchValue({
      });
    } else {


        this.schedulerForm.patchValue({
          busId: this.editModel.busId,
          macId: this.editModel.macId,
          comPort: this.editModel.comPort,
          protocal: this.editModel.protocal,
          baudRate: this.editModel.baudRate,
          timeOut: this.editModel.timeOut,
          startIndex: this.editModel.startIndex,

        });


      }
  }
  getAllBaudrateList(BusId: number): void {

    this.ControllerBusFilter.BusId = 1;
    this._ControllerBusService.getReferencerecords(9, false).subscribe(resp => {
      this.sitebaudrateArray = resp.model as ReferenceRecords[];
   }, error => {
     console.log('Error: ' + error);
   });
  }

  getAllprotocalist(BusId: number): void {

    this.ControllerBusFilter.BusId = 1;
    this._ControllerBusService.getReferencerecords(5, false).subscribe(resp => {
      this.siteprotocalArray = resp.model as ReferenceRecords[];
   }, error => {
     console.log('Error: ' + error);
   });
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
     schedulerDetails.userId = this.SelectedbusId;
   }
   this._ControllerBusService.saveControllerBus(schedulerDetails).subscribe(resp => {
     this.onCloseClick();
     this.CntrBusEditorEmitter.emit(resp);
   }, error => {
     console.log('Error: ' + error);
     this.schedulerForm.enable();
   });
 }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
