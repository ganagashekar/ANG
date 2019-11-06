import { Component, OnInit, Output, Inject, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ControllerBusService } from 'src/app/shared/services/ControllerBus.Services';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { ControllerBusModel } from 'src/app/Model/ServiceResposeModel/Setups/ControllerBusModel';
import { ControllerBusFilter } from 'src/app/Model/FilterModels/ControllerBusFilter';


@Component({
  selector: 'app-cntrbusEditTemplate',
  templateUrl: './cntrbusEditTemplate.component.html',
  styleUrls: ['./cntrbusEditTemplate.component.scss']
})
export class CntrbusEditTemplateComponent implements OnInit {
  @Output()
  controllerbusEditorEmitter = new EventEmitter<any>();
  schedulerForm: FormGroup;
  // stacksArray: ReferenceRecords[] = [];
  // paramArray: ReferenceRecords[] = [];
  // paramUnitsArray: ReferenceRecords[] = [];
  isAdd = true;
  SelectedBusid: bigint;
  SelectedMacid: string;
  editModel: ControllerBusModel;
  ControllerBusFilter: ControllerBusFilter;
  constructor(public dialogRef: MatDialogRef<CntrbusEditTemplateComponent>, private _controllerBusservices: ControllerBusService,
    @Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder,
     private snackBar: MatSnackBar) {
     this.ControllerBusFilter = new ControllerBusFilter();
     if (data !== undefined && data.action === 'edit') {
       this.isAdd = false;
       this.editModel = (data.scheduler as ControllerBusModel );
       this.SelectedBusid = this.editModel.busId;
       this.SelectedMacid = this.editModel.macId;
     }


   }
  ngOnInit() {
    this.schedulerForm = this.formBuilder.group({
      busId: new FormControl('', [Validators.required]),
      macId: new FormControl('', [Validators.required]),
      comPort: new FormControl('', [Validators.required]),
      baudRate: new FormControl('', [Validators.required]),
      timeOut: new FormControl('', [Validators.required]),
      startIndex: new FormControl('', [Validators.required]),
      protocal: new FormControl('', [Validators.required]),
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
}
