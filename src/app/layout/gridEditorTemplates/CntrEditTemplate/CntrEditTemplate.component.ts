import { Component, OnInit, Output, Inject, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ControllerService } from 'src/app/shared/services/Controller.service';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { ControllerModel } from 'src/app/Model/ServiceResposeModel/Setups/ControllerModel';
import { ControllerFilter } from 'src/app/Model/FilterModels/ControllerFilter';

@Component({
  selector: 'app-CntrEditTemplate',
  templateUrl: './CntrEditTemplate.component.html',
  styleUrls: ['./CntrEditTemplate.component.scss']
})
export class CntrEditTemplateComponent implements OnInit {

  @Output()
  ControllerEditorEmitter = new EventEmitter<any>();
  schedulerForm: FormGroup;

  // stacksArray: ReferenceRecords[] = [];
  // paramArray: ReferenceRecords[] = [];
  // paramUnitsArray: ReferenceRecords[] = [];
  isAdd = true;
   SelectedmacId: string;
   SelectedsiteId: bigint;
  // SelectedOsType: string;
  // Selectedcpcb_url: string;
  // Selectedspcb_url: string;
  // SelectedLicencekay: string;
  editModel: ControllerModel;
  ControllerFilter: ControllerFilter;
  constructor(public dialogRef: MatDialogRef<CntrEditTemplateComponent>, private _controllerservices: ControllerService,
    @Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder,
     private snackBar: MatSnackBar) {
      this.ControllerFilter = new ControllerFilter();
      if (data !== undefined && data.action === 'edit') {
        this.isAdd = false;
        this.editModel = (data.Scheduler as ControllerModel );
         this.SelectedmacId = this.editModel.macId;
         this.SelectedsiteId = this.editModel.siteId;
        // this.SelectedOsType = this.editModel.OsType;
        // this.Selectedcpcb_url = this.editModel.cpcb_url;
        // this.Selectedspcb_url = this.editModel.spcb_url;
        // this.SelectedLicencekay = this.editModel.licence_key;
      }
     }

  ngOnInit() {
    this.schedulerForm = this.formBuilder.group({
      macId: new FormControl('', [Validators.required]),
      siteId: new FormControl('', [Validators.required]),
      OsType: new FormControl('', [Validators.required]),
      cpcb_url: new FormControl('', [Validators.required]),
      spcb_url: new FormControl('', [Validators.required]),
      licence_key: new FormControl('', [Validators.required]),
    });

    // if (this.isAdd) { // scheduler add
    //   const currentTime = new Date().getHours().toString() + ':' + new Date().getMinutes().toString();
    //   this.schedulerForm.patchValue({
    //   });
    // } else {


    //     this.schedulerForm.patchValue({
    //       errorcode: this.editModel.errorcode,
    //       errordesc: this.editModel.errordesc,

    //     });


    //   }
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
     // this.saveScheduler();

    }
   }
  saveScheduler(): void {
    const schedulerDetails = this.schedulerForm.value;
   if (!this.isAdd) {
     // schedulerDetails.macId = this.SelectedMacId;
   }
   this._controllerservices.saveController(schedulerDetails).subscribe(resp => {
    this.onCloseClick();
     this.ControllerEditorEmitter.emit(resp);
   }, error => {
     console.log('Error: ' + error);
      this.schedulerForm.enable();
    });
  }


  onCloseClick(): void {
    this.dialogRef.close();
  }
}
