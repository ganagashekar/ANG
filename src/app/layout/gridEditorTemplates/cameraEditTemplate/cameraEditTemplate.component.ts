import { Component, OnInit, Output, Inject, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CameraService } from 'src/app/shared/services/Camera.service';
import { ReferenceRecords } from 'src/app/Model/ServiceResposeModel/CommonModel/ReferenceRecordsModel';
import { CameraModel } from 'src/app/Model/ServiceResposeModel/Setups/CameraModel';
import { CameraFilter } from 'src/app/Model/FilterModels/CameraFilter';


@Component({
  selector: 'app-cameraEditTemplate',
  templateUrl: './cameraEditTemplate.component.html',
  styleUrls: ['./cameraEditTemplate.component.scss']
})
export class CameraEditTemplateComponent implements OnInit {
  @Output()
  CameraEditorEmitter = new EventEmitter<any>();
  schedulerForm: FormGroup;
  stackArray: ReferenceRecords[] = [];
  paramArray: ReferenceRecords[] = [];
  sitesArray: ReferenceRecords[] = [];
  // paramUnitsArray: ReferenceRecords[] = [];
  isAdd = true;
 Selectedconfg_id: bigint ;
 // SelectedvendorisEnabled: number;
 // SelecteduserName: string;
 // SelectedvendorsiteId: bigint;
  editModel: CameraModel;
  CameraFilter: CameraFilter;
  constructor(public dialogRef: MatDialogRef<CameraEditTemplateComponent>, private _cameraservices: CameraService,
    @Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder,
     private snackBar: MatSnackBar) {
      this.CameraFilter = new CameraFilter();
      if (data !== undefined && data.action === 'edit') {
        this.isAdd = false;
        this.editModel = (data.Scheduler as CameraModel );
       this.Selectedconfg_id = this.editModel.confgId;
     }
    }

  ngOnInit() {
    this.getSites();
    this.getParam();
    this.getstack();
    this.schedulerForm = this.formBuilder.group({
     // confgId: new FormControl('', [Validators.required]),
      siteName: new FormControl('', [Validators.required]),
      stackName: new FormControl('', [Validators.required]),
      paramName: new FormControl('', [Validators.required]),
      rtpsUrl: new FormControl('', [Validators.required]),
      ipAddress: new FormControl('', [Validators.required]),
      camMake: new FormControl('', [Validators.required]),
      cam_model_no: new FormControl('', [Validators.required]),
      ptz: new FormControl('', [Validators.required]),
      connectivity_typ: new FormControl('', [Validators.required]),
      band_width: new FormControl('', [Validators.required]),
      night_vision: new FormControl('', [Validators.required]),
      zoom: new FormControl('', [Validators.required]),
      creat_usr: new FormControl('', [Validators.required]),
    });

    if (this.isAdd) { // scheduler add
      const currentTime = new Date().getHours().toString() + ':' + new Date().getMinutes().toString();
      this.schedulerForm.patchValue({
      });
    } else {


        this.schedulerForm.patchValue({
          siteName: this.editModel.siteName,
          stackName: this.editModel.stackName,
          paramName: this.editModel.paramName,
          rtpsUrl: this.editModel.rtpsUrl,
          ipAddress: this.editModel.ipAddress,
          camMake: this.editModel.camMake,
          cam_model_no: this.editModel.cam_model_no,
          ptz: this.editModel.ptz,
          connectivity_typ: this.editModel.connectivity_typ,
          band_width: this.editModel.band_width,
          night_vision: this.editModel.night_vision,
          zoom: this.editModel.zoom,
          creat_usr: this.editModel.creat_usr,
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
   this._cameraservices.saveCamera(schedulerDetails).subscribe(resp => {
     this.onCloseClick();
     this.CameraEditorEmitter.emit(resp);
   }, error => {
     console.log('Error: ' + error);
     this.schedulerForm.enable();
   });
 }

 getSites(): void {
  this._cameraservices.getAllSites(0, false).subscribe(resp => {
    this.sitesArray = resp.model as ReferenceRecords[];
  }, error => {
    console.log('Error: ' + error);
  });
}

 getParam(): void {
  this._cameraservices.getAllParam(0, false).subscribe(resp => {
  this.paramArray = resp.model as ReferenceRecords[];
  }, error => {
   console.log('Error: ' + error);
  });
}

getstack(): void {
  this._cameraservices.getAllstacks(0, false).subscribe(resp => {
  this.stackArray = resp.model as ReferenceRecords[];
  }, error => {
   console.log('Error: ' + error);
  });
}

  onCloseClick(): void {
    this.dialogRef.close();
  }
  }


